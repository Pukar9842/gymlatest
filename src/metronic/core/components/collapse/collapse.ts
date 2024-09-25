/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { CollapseInterface, CollapseConfigInterface } from './types';

export class Collapse extends Component implements CollapseInterface {
  protected override _name: string = 'collapse';
  protected override _defaultConfig: CollapseConfigInterface = {
    hiddenClass: 'hidden',
    activeClass: 'active',
    target: ''
  };
  protected override _config: CollapseConfigInterface = this._defaultConfig;
  protected _isAnimating: boolean = false;
  protected _targetElement: HTMLElement;

  constructor(element: HTMLElement, config?: CollapseConfigInterface) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    this._targetElement = this._getTargetElement();
    if (!this._targetElement) {
      return;
    }

    this._handlers();
  }

  private _getTargetElement(): HTMLElement | null {
    return (      
      Dom.getElement(this._element.getAttribute('data-collapse') as string) ||
      Dom.getElement(this._getOption('target') as string)
    );
  }

  protected _isOpen(): boolean {
    return this._targetElement.classList.contains(this._getOption('activeClass') as string);
  }

  protected _handlers(): void {
    this._element.addEventListener('click', (event: Event) => {
      event.preventDefault();

      this._toggle();
    });
  }

  protected _expand(): void {
    if (this._isAnimating || this._isOpen()) {
      return;
    }

    const payload = { cancel: false };
    this._fireEvent('expand', payload);
    this._dispatchEvent('expand', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._element) {
      this._element.setAttribute('aria-expanded', 'true');
      this._element.classList.add(this._getOption('activeClass') as string);
    }
    this._targetElement.classList.remove(this._getOption('hiddenClass') as string);
    this._targetElement.classList.add(this._getOption('activeClass') as string);

    this._targetElement.style.height = '0px';
    this._targetElement.style.overflow = 'hidden';
    Dom.reflow(this._targetElement);
    this._targetElement.style.height = `${this._targetElement.scrollHeight}px`;
    this._isAnimating = true;

    Dom.transitionEnd(this._targetElement, () => {
      this._isAnimating = false;
      this._targetElement.style.height = '';
      this._targetElement.style.overflow = '';

      this._fireEvent('expanded');
      this._dispatchEvent('expanded');
    });
  }

  protected _collapse(): void {
    if (this._isAnimating || !this._isOpen()) {
      return;
    }

    const payload = { cancel: false };
    this._fireEvent('collapse', payload);
    this._dispatchEvent('collapse', payload);
    if (payload.cancel === true) {
      return;
    }

    if (!this._element) return;
    this._element.setAttribute('aria-expanded', 'false');
    this._element.classList.remove(this._getOption('activeClass') as string);
    this._targetElement.classList.remove(this._getOption('activeClass') as string);

    this._targetElement.style.height = `${this._targetElement.scrollHeight}px`;
    Dom.reflow(this._targetElement);
    this._targetElement.style.height = `0px`;
    this._targetElement.style.overflow = 'hidden';
    this._isAnimating = true;

    Dom.transitionEnd(this._targetElement, () => {
      this._isAnimating = false;
      this._targetElement.classList.add(this._getOption('hiddenClass') as string);
      this._targetElement.style.overflow = '';

      this._fireEvent('collapsed');
      this._dispatchEvent('collapsed');
    });
  }

  protected _toggle(): void {
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._isOpen()) {
      this._collapse();
    } else {
      this._expand();
    }
  }

  public expand(): void {
    return this._expand();
  }

  public collapse(): void {
    return this._collapse();
  }

  public isOpen(): boolean {
    return this._isOpen();
  }

  public static getInstance(element: HTMLElement): Collapse {
    if (!element) return null;

		if (Data.has(element, 'collapse')) {
			return Data.get(element, 'collapse') as Collapse;
		}

		if (element.getAttribute('data-collapse') !== "false") {
			return new Collapse(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: CollapseConfigInterface): Collapse {
    return this.getInstance(element) || new Collapse(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-collapse]:not([data-collapse="false"])');

    elements.forEach((element) => {
      new Collapse(element as HTMLElement);
    });
  }

  public static init(): void {
    Collapse.createInstances();
  }
}
