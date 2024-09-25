/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Utils from '../../helpers/utils';
import Component from '../component';
import { StickyInterface, StickyConfigInterface } from './types';

export class Sticky extends Component implements StickyInterface {
  protected override _name: string = 'sticky';
  protected override _defaultConfig: StickyConfigInterface = {
    name: '',
    class: '',
    top: '',
    left: '',
    right: '',
    width: '',
    zindex: '',
    offset: 0,
    reverse: false,
    release: '',
    activate: '',
  };
  protected override _config: StickyConfigInterface = this._defaultConfig;
  protected _attributeRoot: string;
  protected _eventTriggerState: boolean;
  protected _lastScrollTop: number;
  protected _releaseElement: HTMLElement;
  protected _activateElement: HTMLElement;
  protected _wrapperElement: HTMLElement;

  constructor(element: HTMLElement, config: StickyConfigInterface | null = null) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    this._releaseElement = Dom.getElement(this._getOption('release') as string);
    this._activateElement = Dom.getElement(this._getOption('activate') as string);
    this._wrapperElement = this._element.closest('[data-sticky-wrapper]');
    this._attributeRoot = `data-sticky-${this._getOption('name')}`;
    this._eventTriggerState = true;
    this._lastScrollTop = 0;

    this._handlers();
    this._process();
    this._update();
  }

  protected _handlers(): void {
    window.addEventListener('resize', () => {
			let timer;

			Utils.throttle(
				timer,
				() => {
					this._update();
				},
				200
			);
		});

    window.addEventListener('scroll', () => {
      this._process();
    });
  }

  protected _process(): void {
    const reverse = this._getOption('reverse');
    const offset = this._getOffset();

    if (offset < 0) {
      this._disable();
      return;
    }

    const st = Dom.getScrollTop();
    const release = (this._releaseElement && Dom.isPartiallyInViewport(this._releaseElement));

    // Release on reverse scroll mode
    if (reverse === true) {
      // Forward scroll mode
      if (st > offset && !release) {
        if (document.body.hasAttribute(this._attributeRoot) === false) {
          if (this._enable() === false) {
            return;
          }

          document.body.setAttribute(this._attributeRoot, 'on');
        }

        if (this._eventTriggerState === true) {
          const payload = { active: true };
          this._fireEvent('change', payload);
          this._dispatchEvent('change', payload);
          this._eventTriggerState = false;
        }
        // Back scroll mode
      } else {
        if (document.body.hasAttribute(this._attributeRoot) === true) {
          this._disable();
          if (release) {
            this._element.classList.add('release');
          }
          document.body.removeAttribute(this._attributeRoot);
        }

        if (this._eventTriggerState === false) {
          const payload = { active: false };
          this._fireEvent('change', payload);
          this._dispatchEvent('change', payload);
          this._eventTriggerState = true;
        }
      }

      this._lastScrollTop = st;
      // Classic scroll mode
    } else {
      // Forward scroll mode
      if (st > offset && !release) {
        if (document.body.hasAttribute(this._attributeRoot) === false) {
          if (this._enable() === false) {
            return;
          }

          document.body.setAttribute(this._attributeRoot, 'on');
        }

        if (this._eventTriggerState === true) {
          const payload = { active: true };
          this._fireEvent('change', payload);
          this._dispatchEvent('change', payload);
          this._eventTriggerState = false;
        }
        // Back scroll mode
      } else { // back scroll mode
        if (document.body.hasAttribute(this._attributeRoot) === true) {
          this._disable();
          if (release) {
            this._element.classList.add('release');
          }
          document.body.removeAttribute(this._attributeRoot);
        }

        if (this._eventTriggerState === false) {
          const payload = { active: false };
          this._fireEvent('change', payload);
          this._dispatchEvent('change', payload);
          this._eventTriggerState = true;
        }
      }
    }
  }

  protected _getOffset(): number {
    let offset = parseInt(this._getOption('offset') as string);
    const activateElement = Dom.getElement(this._getOption('activate') as string);

    if (activateElement) {
      offset = Math.abs(offset - activateElement.offsetTop);
    }

    return offset;
  }

  protected _enable(): boolean {
    if (!this._element) return false;

    let width = this._getOption('width') as string;
    const top = this._getOption('top') as string;
    const left = this._getOption('left') as string;
    const right = this._getOption('right') as string;
    const height = this._calculateHeight();
    const zindex = this._getOption('zindex') as string;
    const classList = this._getOption('class') as string;

    if (height + parseInt(top) > Dom.getViewPort().height) {
      return false;
    }

    if (width) {
      const targetElement = document.querySelector(width) as HTMLElement;
      if (targetElement) {
        width = Dom.getCssProp(targetElement, 'width');
      } else if (width == 'auto') {
        width = Dom.getCssProp(this._element, 'width');
      }

      this._element.style.width = `${Math.round(parseFloat(width))}px`;
    }

    if (top) {
      this._element.style.top = `${top}px`;
    }

    if (left) {
      if (left === 'auto') {
        const offsetLeft = Dom.offset(this._element).left;
        if (offsetLeft >= 0) {
          this._element.style.left = `${offsetLeft}px`;
        }
      } else {
        this._element.style.left = `${left}px`;
      }
    }

    if (right) {
      if (right === 'auto') {
        const offseRight = Dom.offset(this._element).right;
        if (offseRight >= 0) {
          this._element.style.right = `${offseRight}px`;
        }
      } else {
        this._element.style.right = `${right}px`;
      }
    }

    if (zindex) {
      this._element.style.zIndex = zindex;
      this._element.style.position = 'fixed';
    }

    if (classList) {
      Dom.addClass(this._element, classList);
    }

    if (this._wrapperElement) {
      this._wrapperElement.style.height = `${height}px`;
    }

    this._element.classList.add('active');
    this._element.classList.remove('release');

    return true;
  }

  protected _disable(): void {
    if (!this._element) return;

    this._element.style.top = '';
    this._element.style.width = '';
    this._element.style.left = '';
    this._element.style.right = '';
    this._element.style.zIndex = '';
    this._element.style.position = '';

    const classList = this._getOption('class') as string;

    if (this._wrapperElement) {
      this._wrapperElement.style.height = '';
    }

    if (classList) {
      Dom.removeClass(this._element, classList);
    }

    this._element.classList.remove('active');
  }

  protected _update(): void {
    if (this._isActive()) {
      this._disable();
      this._enable();
    } else {
      this._disable();
    }
  }

  protected _calculateHeight(): number {
    if (!this._element) return 0;

    let height = parseFloat(Dom.getCssProp(this._element, 'height'));
    height += parseFloat(Dom.getCssProp(this._element, 'margin-top'));
    height += parseFloat(Dom.getCssProp(this._element, 'margin-bottom'));

    if (Dom.getCssProp(this._element, 'border-top')) {
      height = height + parseFloat(Dom.getCssProp(this._element, 'border-top'));
    }

    if (Dom.getCssProp(this._element, 'border-bottom')) {
      height = height + parseFloat(Dom.getCssProp(this._element, 'border-bottom'));
    }

    return height;
  }

  protected _isActive(): boolean {
    return this._element.classList.contains('active');
  }

  public update(): void {
    this._update();
  }

  public isActive(): boolean {
    return this._isActive();
  }

  public static getInstance(element: HTMLElement): Sticky {
    if (!element) return null;

		if (Data.has(element, 'sticky')) {
			return Data.get(element, 'sticky') as Sticky;
		}

		if (element.getAttribute('data-sticky') === "true") {
			return new Sticky(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: StickyConfigInterface): Sticky {
    return this.getInstance(element) || new Sticky(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-sticky="true"]');

    elements.forEach((element) => {
      new Sticky(element as HTMLElement);
    });
  }

  public static init(): void {
    Sticky.createInstances();
  }
}
