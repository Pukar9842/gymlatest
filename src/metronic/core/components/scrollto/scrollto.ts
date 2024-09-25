/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { ScrolltoInterface, ScrolltoConfigInterface } from './types';

export class Scrollto extends Component implements ScrolltoInterface {
  protected override _name: string = 'scrollto';
  protected override _defaultConfig: ScrolltoConfigInterface = {
    smooth: true,
    parent: 'body',
    target: '',
    offset: 0,
  };
  protected override _config: ScrolltoConfigInterface = this._defaultConfig;
  protected _targetElement: HTMLElement;

  constructor(element: HTMLElement, config?: ScrolltoConfigInterface) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    if (!this._element) return;

    this._targetElement = this._getTargetElement();

    if (!this._targetElement) {
      return;
    }

    this._handlers();
  }

  private _getTargetElement(): HTMLElement | null {
    return (      
      Dom.getElement(this._element.getAttribute('data-scrollto') as string) ||
      Dom.getElement(this._getOption('target') as string)
    );
  }

  protected _handlers(): void {
    if (!this._element) return;

    this._element.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this._scroll();
    });
  }

  protected _scroll(): void {
    const pos = this._targetElement.offsetTop + parseInt(this._getOption('offset') as string);

    let parent: HTMLElement | Window = Dom.getElement(this._getOption('parent') as string);
    
    if (!parent || parent === document.body) {
      parent = window;
    }

    parent.scrollTo({
      top: pos,
      behavior: (this._getOption('smooth') as boolean) ? 'smooth' : 'instant',
    });
  }

  public scroll(): void {
    this._scroll();
  }

  public static getInstance(element: HTMLElement): Scrollto {
    if (!element) return null;

		if (Data.has(element, 'scrollto')) {
			return Data.get(element, 'scrollto') as Scrollto;
		}

		if (element.getAttribute('data-scrollto') !== "false") {
			return new Scrollto(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: ScrolltoConfigInterface): Scrollto {
    return this.getInstance(element) || new Scrollto(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-scrollto]:not([data-scrollto="false"])');
    
    elements.forEach((element) => {
      new Scrollto(element as HTMLElement);
    });
  }

  public static init(): void {
    Scrollto.createInstances();
  }
};
