/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Utils from '../../helpers/utils';
import Component from '../component';
import { ReparentInterface, ReparentConfigInterface } from './types';

declare global {
  interface Window {
    _REPARENT_INITIALIZED: boolean;
  }
}

export class Reparent extends Component implements ReparentInterface {
  protected override _name: string = 'reparent';
  protected override _defaultConfig: ReparentConfigInterface = {
    mode: '',
    target: ''
  };

  constructor(element: HTMLElement, config: ReparentConfigInterface | null = null) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);
    this._update();
  }

  protected _update(): void {
    if (!this._element) return;
    const target = this._getOption('target') as string;
    const targetEl = Dom.getElement(target);
    const mode = this._getOption('mode');

    if (targetEl && this._element.parentNode !== targetEl) {
      if (mode === 'prepend') {
        targetEl.prepend(this._element);
      } else if (mode === 'append') {
        targetEl.append(this._element);
      }
    }
  }

  public update(): void {
    this._update();
  }

  public static handleResize(): void {
    window.addEventListener('resize', () => {
      let timer;

      Utils.throttle(timer, () => {
        document.querySelectorAll('[data-reparent]').forEach((element) => {
          const reparent = Reparent.getInstance(element as HTMLElement);
          reparent?.update();
        });
      }, 200);
    });
  }

  public static getInstance(element: HTMLElement): Reparent {
    return Data.get(element, 'reparent') as Reparent;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: ReparentConfigInterface): Reparent {
    return this.getInstance(element) || new Reparent(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-reparent="true"]');

    elements.forEach((element) => {
      new Reparent(element as HTMLElement);
    });
  }

  public static init(): void {
    Reparent.createInstances();

    if (window._REPARENT_INITIALIZED !== true) {
      Reparent.handleResize();
      window._REPARENT_INITIALIZED = true;
    }
  }
}
