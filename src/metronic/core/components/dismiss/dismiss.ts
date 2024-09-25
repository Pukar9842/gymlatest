/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { DismissInterface, DismissConfigInterface } from './types';
import { DismissModeType } from './types';

export class Dismiss extends Component implements DismissInterface {
  protected override _name: string = 'dismiss';
  protected override _defaultConfig: DismissConfigInterface = {
    hiddenClass: 'hidden',
    mode: 'remove',
    interrupt: true,
    target: '',
  };
  protected override _config: DismissConfigInterface = this._defaultConfig;
  protected _isAnimating: boolean = false;
  protected _targetElement: HTMLElement | null = null;

  constructor(element: HTMLElement, config?: DismissConfigInterface) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    this._config['mode'] = this._config['mode'] as DismissModeType;

    if (!this._element) return;

    this._targetElement = this._getTargetElement();
    if (!this._targetElement) {
      return;
    }

    this._handlers();
  }

  private _getTargetElement(): HTMLElement | null {
    return (      
      Dom.getElement(this._element.getAttribute('data-dismiss') as string) ||
      Dom.getElement(this._getOption('target') as string)
    );
  }

  protected _handlers(): void {
    if (!this._element) return;

    this._element.addEventListener('click', (event: Event) => {
      event.preventDefault();

      if ((this._getOption('interrupt') as boolean) === true ) {
        event.stopPropagation();
      }      

      this._dismiss();      
    });
  }

  protected _dismiss(): void {
    if (this._isAnimating) {
      return;
    }

    const payload = { cancel: false };
    this._fireEvent('dismiss', payload);
    this._dispatchEvent('dismiss', payload);
    if (payload.cancel === true) {
      return;
    }

    if (!this._targetElement) return;
    this._targetElement.style.opacity = '0';
    Dom.reflow(this._targetElement);
    this._isAnimating = true;

    Dom.transitionEnd(this._targetElement, () => {
      if (!this._targetElement) return;
      this._isAnimating = false;
      this._targetElement.style.opacity = '';

      if (this._getOption('mode').toString().toLowerCase() === 'hide') {
        this._targetElement.classList.add(this._getOption('hiddenClass') as string);
      } else {
        Dom.remove(this._targetElement);
      }      

      this._fireEvent('dismissed');
      this._dispatchEvent('dismissed');
    });
  }

  public getTargetElement(): HTMLElement {
    return this._targetElement;
  }

  public dismiss(): void {
    this._dismiss();
  }

  public static getInstance(element: HTMLElement): Dismiss {
    if (!element) return null;

		if (Data.has(element, 'dismiss')) {
			return Data.get(element, 'dismiss') as Dismiss;
		}

		if (element.getAttribute('data-dismiss') !== "false") {
			return new Dismiss(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: DismissConfigInterface): Dismiss {
    return this.getInstance(element) || new Dismiss(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-dismiss]:not([data-dismiss="false"])');

    elements.forEach((element) => {
      new Dismiss(element as HTMLElement);
    });
  }

  public static init(): void {
    Dismiss.createInstances();
  }
}