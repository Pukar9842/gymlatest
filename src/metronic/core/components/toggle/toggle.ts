/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { ToggleConfigInterface, ToggleInterface } from './types';

export class Toggle extends Component implements ToggleInterface {
  protected override _name: string = 'toggle';
  protected override _defaultConfig: ToggleConfigInterface = {
    target: '',
    activeClass: 'active',
    class: '',
    removeClass: '',
    attribute: ''
  };
  protected override _config: ToggleConfigInterface = this._defaultConfig;
  protected _targetElement: HTMLElement;

  constructor(element: HTMLElement, config: ToggleConfigInterface | null = null) {
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

  protected _handlers(): void {
    if (!this._element) return;

    this._element.addEventListener('click', () => {
      this._toggle();
    });
  }

  private _getTargetElement(): HTMLElement | null {
    return (      
      Dom.getElement(this._element.getAttribute('data-toggle') as string) ||
      Dom.getElement(this._getOption('target') as string)
    );
  }

  protected _toggle(): void {
    if (!this._element) return;
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    this._element.classList.toggle(this._getOption('activeClass') as string);
    this._update();

    this._fireEvent('toggled');
    this._dispatchEvent('toggled');
  }

  protected _update(): void {
    if (!this._targetElement) return;

    if (this._getOption('removeClass')) {
      Dom.removeClass(this._targetElement, this._getOption('removeClass') as string);
    }

    if (!this._isActive()) {
      if (this._getOption('class')) {
        Dom.addClass(this._targetElement, this._getOption('class') as string);
      }

      if (this._getOption('attribute')) {
        this._targetElement.setAttribute(this._getOption('attribute') as string, 'true');
      }
    } else {
      if (this._getOption('class')) {
        Dom.removeClass(this._targetElement, this._getOption('class') as string);
      }

      if (this._getOption('attribute')) {
        this._targetElement.removeAttribute(this._getOption('attribute') as string);
      }
    }
  }

  public _isActive(): boolean {
    if (!this._element) return false;

    return (
      Dom.hasClass(this._targetElement, this._getOption('class') as string) || 
      this._targetElement.hasAttribute(this._getOption('attribute') as string)
    );
  }

  public toggle(): void {
    this._toggle();
  }

  public update(): void {
    this._update();
  }

  public isActive(): boolean {
    return this._isActive();
  }

  public static getInstance(element: HTMLElement): Toggle {
    if (!element) return null;

		if (Data.has(element, 'toggle')) {
			return Data.get(element, 'toggle') as Toggle;
		}

		if (element.getAttribute('data-toggle') !== "false") {
			return new Toggle(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: ToggleConfigInterface): Toggle {
    return this.getInstance(element) || new Toggle(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-toggle]:not([data-toggle="false"])');
    elements.forEach((element) => {
      new Toggle(element as HTMLElement);
    });
  }

  public static init(): void {
    Toggle.createInstances();
  }
}