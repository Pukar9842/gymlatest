/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import EventHandler from '../../helpers/event-handler';
import Component from '../component';
import { ThemeInterface, ThemeConfigInterface } from './types';
import { ThemeModeType } from './types';

export class Theme extends Component implements ThemeInterface {
  protected override _name: string = 'theme';
  protected override _defaultConfig: ThemeConfigInterface = {
    mode: 'light',
    class: true,
    attribute: 'data-theme-mode',
  };
  protected _mode: ThemeModeType | null = null;
  protected _currentMode: ThemeModeType | null = null;

  constructor(element: HTMLElement, config: ThemeConfigInterface | null = null) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);
    this._setMode((localStorage.getItem('theme') || this._getOption('mode')) as ThemeModeType);
    this._handlers();
  }

  protected _handlers(): void {
    if (!this._element) return;

    EventHandler.on(this._element, '[data-theme-toggle="true"]', 'click', () => {
      this._toggle();
    });

    EventHandler.on(this._element, '[data-theme-switch]', 'click', (event: Event, target: HTMLElement) => {
      event.preventDefault();

      const mode = target.getAttribute('data-theme-switch') as ThemeModeType;
      this._setMode(mode);
    });
  }

  protected _toggle() {
    const mode = this._currentMode === 'light' ? 'dark' : 'light';

    this._setMode(mode);
  }

  protected _setMode(mode: ThemeModeType): void {
    if (!this._element) return;
    const payload = { cancel: false };
    this._fireEvent('change', payload);
    this._dispatchEvent('change', payload);
    if (payload.cancel === true) {
      return;
    }

    let currentMode: ThemeModeType = mode;
    if (mode === 'system') {
      currentMode = this._getSystemMode();
    }

    this._mode = mode;
    this._currentMode = currentMode;
    this._bindMode();
    this._updateState();
    localStorage.setItem('theme', this._mode);
    this._element.setAttribute('data-theme-mode', mode);

    this._fireEvent('changed', {});
    this._dispatchEvent('changed', {});
  }

  protected _getMode(): ThemeModeType {
    return localStorage.getItem('theme') as ThemeModeType || this._mode;
  }

  protected _getSystemMode(): ThemeModeType {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  protected _bindMode(): void {
    if (!this._currentMode || !this._element) {
      return;
    }

    if (this._getOption('class')) {
      this._element.classList.remove('dark');
      this._element.classList.remove('light');
      this._element.removeAttribute(this._getOption('attribute') as string);
      this._element.classList.add(this._currentMode);
    } else {
      this._element.classList.remove(this._currentMode);
      this._element.setAttribute(this._getOption('attribute') as string, this._currentMode);
    }
  }

  protected _updateState() {
    const elements = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-theme-state]');
    elements.forEach((element) => {
      if (element.getAttribute('data-theme-state') === this._mode) {
        element.checked = true;
      }
    });
  }

  public getMode(): ThemeModeType {
    return this._getMode();
  }

  public setMode(mode: ThemeModeType) {
    this.setMode(mode);
  }

  public static getInstance(element: HTMLElement): Theme {
    if (!element) return null;

		if (Data.has(element, 'theme')) {
			return Data.get(element, 'theme') as Theme;
		}

		if (element.getAttribute('data-theme') !== "false") {
			return new Theme(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement = document.body, config?: ThemeConfigInterface): Theme | null {
    return this.getInstance(element) || new Theme(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-theme]:not([data-theme="false"]');

    elements.forEach((element) => {
      new Theme(element as HTMLElement);
    });
  }

  public static init(): void {
    Theme.createInstances();
  }
}