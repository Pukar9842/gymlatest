/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { TogglePasswordConfigInterface, TogglePasswordInterface } from './types';

export class TogglePassword extends Component implements TogglePasswordInterface {
  protected override _name: string = 'toggle-password';
  protected override _defaultConfig: TogglePasswordConfigInterface = {
    permanent: false
  };
  protected override _config: TogglePasswordConfigInterface = this._defaultConfig;
  protected _triggerElement: HTMLElement;
  protected _inputElement: HTMLInputElement;

  constructor(element: HTMLElement, config: TogglePasswordConfigInterface | null = null) {
    super();
    
    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    this._triggerElement = this._element.querySelector('[data-toggle-password-trigger]');
    this._inputElement = this._element.querySelector('input');
    
    if (!this._triggerElement || !this._inputElement) {
      return;
    }

    this._handlers();
  }

  protected _handlers(): void {
    if (!this._element) return;

    this._triggerElement.addEventListener('click', (e: Event) => {
      this._toggle();
    });

    this._inputElement.addEventListener('input', () => {
      this._update();
    });
  }

  protected _toggle(): void {
    if (!this._element) return;
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._isVisible()) {
      this._element.classList.remove('active')
      this._setVisible(false);
    } else {
      this._element.classList.add('active')
      this._setVisible(true);
    }

    this._fireEvent('toggled');
    this._dispatchEvent('toggled');
  }

  protected _update(): void {
    if (!this._element) return;

    if ((this._getOption('permanent') as boolean) === false) {
      if (this._isVisible()) {
        this._setVisible(false);
      }
    }
  }

  public _isVisible(): boolean {
    return this._inputElement.getAttribute('type') === 'text';
  }

  public _setVisible(flag: boolean) {
    if (flag) {
      this._inputElement.setAttribute('type', 'text');
    } else {
      this._inputElement.setAttribute('type', 'password');
    }
  }

  public toggle(): void {
    this._toggle();
  }

  public setVisible(flag: boolean): void {
    this._setVisible(flag);
  }

  public isVisible(): boolean {
    return this._isVisible();
  }

  public static getInstance(element: HTMLElement): TogglePassword {
    if (!element) return null;

		if (Data.has(element, 'toggle-password')) {
			return Data.get(element, 'toggle-password') as TogglePassword;
		}

		if (element.getAttribute('data-toggle-password') === "true") {
			return new TogglePassword(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: TogglePasswordConfigInterface): TogglePassword {
    return this.getInstance(element) || new TogglePassword(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-toggle-password="true"]');

    elements.forEach((element) => {
      new TogglePassword(element as HTMLElement);
    });
  }

  public static init(): void {
    TogglePassword.createInstances();
  }
}