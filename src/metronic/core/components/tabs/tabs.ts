/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import EventHandler from '../../helpers/event-handler';
import Component from '../component';
import { TabsInterface, TabsConfigInterface } from './types';

declare global {
  interface Window {
    _TABS_INITIALIZED: boolean;
  }
}

export class Tabs extends Component implements TabsInterface {
  protected override _name: string = 'tabs';
  protected override _defaultConfig: TabsConfigInterface = {
    hiddenClass: '',
  };
  protected override _config: TabsConfigInterface = this._defaultConfig;
  protected _currentTabElement: HTMLElement | null = null;
  protected _currentContentElement: HTMLElement | null = null;
  protected _lastTabElement: HTMLElement | null = null;
  protected _lastContentElement: HTMLElement | null = null;
  protected _tabElements: NodeListOf<HTMLElement> | null = null;
  protected _isTransitioning: boolean = false;

  constructor(element: HTMLElement, config?: TabsConfigInterface) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);

    if (!this._element) return;
    this._tabElements = this._element.querySelectorAll('[data-tab-toggle]');
    this._currentTabElement = this._element.querySelector('.active[data-tab-toggle]');
    this._currentContentElement = this._currentTabElement && (Dom.getElement(this._currentTabElement.getAttribute('data-tab-toggle')) || Dom.getElement(this._currentTabElement.getAttribute('href')))|| null;

    this._handlers();
  }

  protected _handlers(): void {
    if (!this._element) return;

    EventHandler.on(this._element, '[data-tab-toggle]', 'click', (event: Event, target: HTMLElement) => {
      event.preventDefault();
      this._show(target);
    });
  }

  protected _show(tabElement: HTMLElement): void {
    if (this._isShown(tabElement) || this._isTransitioning) return;

    const payload = { cancel: false };
    this._fireEvent('show', payload);
    this._dispatchEvent('show', payload);
    if (payload.cancel === true) {
      return;
    }

    this._currentTabElement?.classList.remove('active');
    this._currentContentElement?.classList.add(this._getOption('hiddenClass') as string);
    this._lastTabElement = this._currentTabElement;
    this._getDropdownToggleElement(this._lastTabElement)?.classList.remove('active');

    this._lastContentElement = this._currentContentElement;
    this._currentTabElement = tabElement;
    this._currentContentElement = Dom.getElement(tabElement.getAttribute('data-tab-toggle')) || Dom.getElement(tabElement.getAttribute('href'));
    this._currentTabElement?.classList.add('active');
    this._currentContentElement?.classList.remove(this._getOption('hiddenClass') as string);
    this._getDropdownToggleElement(this._currentTabElement)?.classList.add('active');

    this._currentContentElement.style.opacity = '0';
		Dom.reflow(this._currentContentElement);
		this._currentContentElement.style.opacity = '1';

    Dom.transitionEnd(this._currentContentElement, () => {
      this._isTransitioning = false;
      this._currentContentElement.style.opacity = '';

      this._fireEvent('shown');
      this._dispatchEvent('shown');
    });
  }

  protected _getDropdownToggleElement(element: HTMLElement): HTMLElement {
    const containerElement = element.closest('.dropdown') as HTMLElement;

    if (containerElement) {
      return containerElement.querySelector('.dropdown-toggle');
    } else {
      return null;
    }
  }

  protected _isShown(tabElement: HTMLElement): boolean {
    return tabElement.classList.contains('active');
  }

  public isShown(tabElement: HTMLElement): boolean {
    return this._isShown(tabElement);
  }

  public show(tabElement: HTMLElement): void {
    return this._show(tabElement);
  }

  public static keyboardArrow(): void {

  }

  public static keyboardJump(): void {

  }

  public static handleAccessibility(): void {

  }

  public static getInstance(element: HTMLElement): Tabs {
    if (!element) return null;

		if (Data.has(element, 'tabs')) {
			return Data.get(element, 'tabs') as Tabs;
		}

		if (element.getAttribute('data-tabs') === "true") {
			return new Tabs(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: TabsConfigInterface): Tabs {
    return this.getInstance(element) || new Tabs(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-tabs="true"]');

    elements.forEach((element) => {
      new Tabs(element as HTMLElement);
    });
  }

  public static init(): void {
    Tabs.createInstances();

    if (window._TABS_INITIALIZED !== true) {
      Tabs.handleAccessibility();
      window._TABS_INITIALIZED = true;
    }
  }
}
