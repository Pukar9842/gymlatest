import Data from '../../helpers/data';
import Dom from '../../helpers/dom';
import EventHandler from '../../helpers/event-handler';
import Component from '../component';
import { AccordionInterface, AccordionConfigInterface } from './types';

export class Accordion extends Component implements AccordionInterface {
  protected override _name: string = 'accordion';
  protected override _defaultConfig: AccordionConfigInterface = {
    hiddenClass: 'hidden',
    activeClass: 'active',
    expandAll: false
  };
  protected override _config: AccordionConfigInterface = this._defaultConfig;
  protected _accordionElements: NodeListOf<HTMLElement>;

  constructor(element: HTMLElement, config?: AccordionConfigInterface) {
    super();

    if (Data.has(element as HTMLElement, this._name)) return;

    this._init(element);
    this._buildConfig(config);
    this._handlers();
  }

  protected _handlers(): void {
    EventHandler.on(this._element, '[data-accordion-toggle]', 'click', (event: Event, target: HTMLElement) => {
      event.preventDefault();
      const accordionElement = target.closest('[data-accordion-item]') as HTMLElement;

      if (accordionElement) this._toggle(accordionElement);
    });
  }

  protected _toggle(accordionElement: HTMLElement): void {
    const payload = { cancel: false };
    this._fireEvent('toggle', payload);
    this._dispatchEvent('toggle', payload);
    if (payload.cancel === true) {
      return;
    }

    if (accordionElement.classList.contains('active')) {
      this._hide(accordionElement);
    } else {
      this._show(accordionElement);
    }
  }

  protected _show(accordionElement: HTMLElement): void {
    if (accordionElement.hasAttribute('animating') || accordionElement.classList.contains(this._getOption('activeClass') as string)) return;

    const toggleElement = Dom.child(accordionElement, '[data-accordion-toggle]');
    if (!toggleElement) return;

    const contentElement = Dom.getElement(toggleElement.getAttribute('data-accordion-toggle'));
    if (!contentElement) return;

    const payload = { cancel: false };
    this._fireEvent('show', payload);
    this._dispatchEvent('show', payload);
    if (payload.cancel === true) {
      return;
    }

    if (this._getOption('expandAll') as boolean === false) {
      this._hideSiblings(accordionElement);
    }

    accordionElement.setAttribute('aria-expanded', 'true');
    accordionElement.classList.add(this._getOption('activeClass') as string);

    accordionElement.setAttribute('animating', 'true');
    contentElement.classList.remove(this._getOption('hiddenClass') as string);
    contentElement.style.height = `0px`;
    Dom.reflow(contentElement);
    contentElement.style.height = `${contentElement.scrollHeight}px`;

    Dom.transitionEnd(contentElement, () => {
      accordionElement.removeAttribute('animating');
      contentElement.style.height = ''

      this._fireEvent('shown');
      this._dispatchEvent('shown');
    });
  }

  protected _hide(accordionElement: HTMLElement): void {
    if (accordionElement.hasAttribute('animating') || !accordionElement.classList.contains(this._getOption('activeClass') as string)) return;

    const toggleElement = Dom.child(accordionElement, '[data-accordion-toggle]');
    if (!toggleElement) return;

    const contentElement = Dom.getElement(toggleElement.getAttribute('data-accordion-toggle'));
    if (!contentElement) return;

    const payload = { cancel: false };
    this._fireEvent('hide', payload);
    this._dispatchEvent('hide', payload);
    if (payload.cancel === true) {
      return;
    }

    accordionElement.setAttribute('aria-expanded', 'false');    

    contentElement.style.height = `${contentElement.scrollHeight}px`;
    Dom.reflow(contentElement);
    contentElement.style.height = '0px';
    accordionElement.setAttribute('animating', 'true');

    Dom.transitionEnd(contentElement, () => {
      accordionElement.removeAttribute('animating');
      accordionElement.classList.remove(this._getOption('activeClass') as string);
      contentElement.classList.add(this._getOption('hiddenClass') as string);

      this._fireEvent('hidden');
      this._dispatchEvent('hidden');
    });
  }

  protected _hideSiblings(accordionElement: HTMLElement): void {
    const siblings = Dom.siblings(accordionElement);

    siblings?.forEach((sibling) => {
      this._hide(sibling as HTMLElement);
    });
  }

  public show(accordionElement: HTMLElement): void {
    this._show(accordionElement);
  }

  public hide(accordionElement: HTMLElement): void {
    this._hide(accordionElement);
  }

  public toggle(accordionElement: HTMLElement): void {
    this._toggle(accordionElement);
  }

  public static getInstance(element: HTMLElement): Accordion {
    if (!element) return null;

		if (Data.has(element, 'accordion')) {
			return Data.get(element, 'accordion') as Accordion;
		}

		if (element.getAttribute('data-accordion') === "true") {
			return new Accordion(element);
		}

    return null;
  }

  public static getOrCreateInstance(element: HTMLElement, config?: AccordionConfigInterface): Accordion {
    return this.getInstance(element) || new Accordion(element, config);
  }

  public static createInstances(): void {
    const elements = document.querySelectorAll('[data-accordion="true"]');

    elements.forEach((element) => {
      new Accordion(element as HTMLElement);
    });
  }

  public static init(): void {
    Accordion.createInstances();
  }
}
