/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import Component from '../component';
import { TooltipInterface, TooltipConfigInterface } from './types';
import { createPopper, PositioningStrategy, Instance, Placement } from '@popperjs/core';
import { TooltipTriggerType } from './types';

declare global {
  interface Window {
    _TOOLTIP_INITIALIZED: boolean;
  }
}

export class Tooltip extends Component implements TooltipInterface {
  protected override _name: string = 'tooltip';
  protected override _defaultConfig: TooltipConfigInterface = {
    target: '',
    hiddenClass: 'hidden',
    trigger: 'hover',
    placement: 'top',
    container: '',
    strategy: 'fixed',
    offset: '0, 5px',
    delayShow: 0,
    delayHide: 0,
    permanent: false,
    zindex: '100'
  };
  protected override _config: TooltipConfigInterface = this._defaultConfig;
  protected _isOpen: boolean = false;
  protected _targetElement: HTMLElement;
  protected _popper!: Instance;
  protected _transitioning: boolean = false;
  protected _timeout!: ReturnType<typeof setTimeout>;

  constructor(element: HTMLElement, config: TooltipConfigInterface | null = null) {
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
      Dom.getElement(this._element.getAttribute('data-tooltip') as string) ||
      this._element.querySelector('.tooltip, .popover, [data-tooltip-content]') ||
      Dom.getElement(this._getOption('target') as string)
    );
  }

  protected _handlers(): void {
    if (!this._element) return;

    if (this._getOption('trigger') === 'click') {
      this._element.addEventListener('click', () => this._toggle());
    }

    if (this._getOption('trigger') === 'focus') {
      this._element.addEventListener('focus', () => this._toggle());
      this._element.addEventListener('blur', () => this._hide());
    }

    if (this._getOption('trigger') === 'hover') {
      this._element.addEventListener('mouseenter', () => this._show());
      this._element.addEventListener('mouseleave', () => this._hide());
    }
  }

  protected _show(): void {
    if (this._isOpen) return;

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      const payload = { cancel: false };
      this._fireEvent('show', payload);
      this._dispatchEvent('show', payload);
      if (payload.cancel === true) {
        return;
      }

      if (!this._targetElement) {
        return;
      }
      if (!this._element) return;

      this._createPopper();
      this._handleContainer();
      this._setZindex();

      this._targetElement.classList.add('show');
      this._targetElement.classList.remove(this._getOption('hiddenClass') as string);
      this._targetElement.style.opacity = '0';
      Dom.reflow(this._targetElement);
      this._targetElement.style.opacity = '1';
      this._transitioning = true;
      this._isOpen = true;

      Dom.transitionEnd(this._targetElement, () => {
        this._targetElement.style.opacity = '';
        this._transitioning = false;
        this._fireEvent('shown');
        this._dispatchEvent('shown');
      });
    }, this._getOption('delayShow') as number);
  }

  protected _hide(): void {
    if (!this._isOpen) return;

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      const payload = { cancel: false };
      this._fireEvent('hide', payload);
      this._dispatchEvent('hide', payload);
      if (payload.cancel === true) {
        return;
      }

      if (!this._targetElement) {
        return
      }

      this._targetElement.style.opacity = '1';
      Dom.reflow(this._targetElement);
      this._targetElement.style.opacity = '0';
      this._transitioning = true;
      this._isOpen = false;

      Dom.transitionEnd(this._targetElement, () => {
        this._popper.destroy();
        this._targetElement.classList.remove('show');
        this._targetElement.classList.add(this._getOption('hiddenClass') as string);
        this._targetElement.style.opacity = '';
        this._transitioning = false;
        this._fireEvent('hidden');
        this._dispatchEvent('hidden');
      });
    }, this._getOption('delayHide') as number);
  }

  protected _toggle(): void {
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._isOpen) {
      this._hide();
    } else {
      this._show();
    }
  }

  protected _createPopper(): void {
    if (!this._element) return;
    const offsetValue = this._getOption('offset');
    const offset = offsetValue ? offsetValue.toString().split(',').map(value => parseInt(value.trim(), 10)) : [0, 0];

    if (!this._targetElement) {
      return;
    }

    this._popper = createPopper(
      this._element,
      this._targetElement,
      {
        placement: this._getOption('placement') as Placement,
        strategy: this._getOption('strategy') as PositioningStrategy,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset
            }
          }
        ]
      }
    );
  }

  protected _handleContainer(): void {
    if (this._getOption('container')) {
      if (this._getOption('container') === 'body') {
        document.body.appendChild(this._targetElement);
      } else {
        document.querySelector(this._getOption('container') as string)?.appendChild(this._targetElement);
      }
    }
  }

  protected _setZindex(): void {
    let zindex: number = parseInt(this._getOption('zindex') as string);

    if (parseInt(Dom.getCssProp(this._element, 'z-index')) > zindex) {
      zindex = parseInt(Dom.getCssProp(this._element, 'z-index'));
    }

    if (Dom.getHighestZindex(this._element) > zindex) {
      zindex =Dom.getHighestZindex(this._element) + 1;
    }

    this._targetElement.style.zIndex = String(zindex);
  }

  public show(): void {
    this._show();
  }

  public hide(): void {
    this._hide();
  }

  public toggle(): void {
    this._toggle();
  }

  public getContentElement(): HTMLElement | null {
    return this._targetElement;
  }

  public isOpen(): boolean {
    return this._isOpen;
  }

  public getTriggerOption(): TooltipTriggerType {
    return this._getOption('trigger') as TooltipTriggerType;
  }

  public isPermanent(): boolean {
    return this._getOption('permanent') as boolean;
  }

  public static initHandlers(): void {
    document.addEventListener('click', (event: Event) => {
      document.querySelectorAll('[data-tooltip]').forEach((tooltipElement) => {
        const tooltip = Tooltip.getInstance(tooltipElement as HTMLElement);

        if (tooltip && tooltip.isOpen() && tooltip.getTriggerOption() !== 'hover' && !tooltip.isPermanent()) {
          const contentElement = tooltip.getContentElement();
          if (contentElement && (contentElement === event.target || contentElement.contains(event.target as HTMLElement))) {
            return;
          } else {
            tooltip.hide();
          }
        }
      });
    });
  }

  public static getInstance(element: HTMLElement): Tooltip {
    if (!element) return null;

		if (Data.has(element, 'tooltip')) {
			return Data.get(element, 'tooltip') as Tooltip;
		}

		if (element.getAttribute('data-tooltip') !== "false") {
			return new Tooltip(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: TooltipConfigInterface): Tooltip {
    return this.getInstance(element) || new Tooltip(element, config);
  }

  public static createInstances(): void {
    document.querySelectorAll('[data-tooltip]:not([data-tooltip="false"])').forEach((element) => {
      new Tooltip(element as HTMLElement);
    });
  }

  public static init(): void {
    Tooltip.createInstances();

    if (window._TOOLTIP_INITIALIZED !== true) {
      Tooltip.initHandlers();
      window._TOOLTIP_INITIALIZED = true;
    }
  }
}