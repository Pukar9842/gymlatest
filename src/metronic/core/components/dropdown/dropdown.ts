import { Instance as PopperInstance, createPopper, Placement, VirtualElement } from '@popperjs/core';
import Dom from '../../helpers/dom';
import Data from '../../helpers/data';
import EventHandler from '../../helpers/event-handler';
import Component from '../component';
import { DropdownConfigInterface, DropdownInterface } from './types';
import { Menu } from '../menu';

declare global {
	interface Window {
		_DROPDOWN_INITIALIZED: boolean;
	}
}

export class Dropdown extends Component implements DropdownInterface {
	protected override _name: string = 'dropdown';
	protected override _defaultConfig: DropdownConfigInterface = {
		zindex: 105,
		hoverTimeout: 200,
		placement: 'bottom-start',
		permanent: false,
		dismiss: false,
		trigger: 'click',
		attach: '',
		offset: '0px, 5px',
		hiddenClass: 'hidden'
	};
	protected override _config: DropdownConfigInterface = this._defaultConfig;
	protected _disabled: boolean = false;
	protected _toggleElement: HTMLElement;
	protected _contentElement: HTMLElement;
	protected _isTransitioning: boolean = false;
	protected _isOpen: boolean = false;

	constructor(element: HTMLElement, config?: DropdownConfigInterface) {
		super();

		if (Data.has(element as HTMLElement, this._name)) return;

		this._init(element);
		this._buildConfig(config);

		this._toggleElement = this._element.querySelector('.dropdown-toggle');
		if (!this._toggleElement) return;
		this._contentElement = this._element.querySelector('.dropdown-content, [data-dropdown-content="true"]');
		if (!this._contentElement) return;

		Data.set(this._contentElement, 'dropdownElement', this._element);
	}

	protected _click(event: Event): void {
		event.preventDefault();
		event.stopPropagation();

		if (this._disabled === true) {
			return;
		}

		if (this._getOption('trigger') !== 'click') {
			return;
		}

		this._toggle();
	}

	protected _mouseover(): void {
		if (this._disabled === true) {
			return;
		}

		if (this._getOption('trigger') !== 'hover') {
			return;
		}

		if (Data.get(this._element, 'hover') === '1') {
			clearTimeout(Data.get(this._element, 'timeout') as number);
			Data.remove(this._element, 'hover');
			Data.remove(this._element, 'timeout');
		}

		this._show();
	}

	protected _mouseout(): void {
		if (this._disabled === true) {
			return;
		}

		if (this._getOption('trigger') !== 'hover') {
			return;
		}

		const timeout = setTimeout(() => {
			if (Data.get(this._element, 'hover') === '1') {
				this._hide();
			}
		}, parseInt(this._getOption('hoverTimeout') as string));

		Data.set(this._element, 'hover', '1');
		Data.set(this._element, 'timeout', timeout);
	}

	protected _toggle(): void {
		if (this._isOpen) {
			this._hide();
		} else {
			this._show();
		}
	}

	protected _show(): void {
		if (this._isOpen || this._isTransitioning) {
      return;
    }

		const payload = { cancel: false };
		this._fireEvent('show', payload);
		this._dispatchEvent('show', payload);
		if (payload.cancel === true) {
			return;
		}

		// Hide all currently shown dropdowns except current one
		Dropdown.hide();
		Menu.hide(this._element);

		let zIndex: number = parseInt(this._getOption('zindex') as string);
		const parentZindex: number = Dom.getHighestZindex(this._element);

		if (parentZindex !== null && parentZindex >= zIndex) {
			zIndex = parentZindex + 1;
		}
		if (zIndex > 0) {
			this._contentElement.style.zIndex = zIndex.toString();
		}

		this._contentElement.style.display = 'block';
		this._contentElement.style.opacity = '0';
		Dom.reflow(this._contentElement);
		this._contentElement.style.opacity = '1';

		this._contentElement.classList.remove(this._getOption('hiddenClass') as string);
		this._toggleElement.classList.add('active');
		this._contentElement.classList.add('open');
		this._element.classList.add('open');

		this._initPopper();

		Dom.transitionEnd(this._contentElement, () => {
      this._isTransitioning = false;
      this._isOpen = true;

      this._fireEvent('shown');
      this._dispatchEvent('shown');
    });
	}

	protected _hide(): void {
		if (this._isOpen === false || this._isTransitioning) {
      return;
    }

		const payload = { cancel: false };
		this._fireEvent('hide', payload);
		this._dispatchEvent('hide', payload);
		if (payload.cancel === true) {
			return;
		}

		this._contentElement.style.opacity = '1';
		Dom.reflow(this._contentElement);
		this._contentElement.style.opacity = '0';
		this._contentElement.classList.remove('open');
		this._toggleElement.classList.remove('active');
		this._element.classList.remove('open');

		Dom.transitionEnd(this._contentElement, () => {
      this._isTransitioning = false;
      this._isOpen = false;

			this._contentElement.classList.add(this._getOption('hiddenClass') as string);
			this._contentElement.style.display = '';
			this._contentElement.style.zIndex = '';

			// Destroy popper(new)
			this._destroyPopper();

			// Handle dropdown hidden event
      this._fireEvent('hidden');
      this._dispatchEvent('hidden');
    });
	}

	protected _initPopper(): void {
		// Setup popper instance
		let reference: HTMLElement;
		const attach: string = this._getOption('attach') as string;

		if (attach) {
			if (attach === 'parent') {
				reference = this._toggleElement.parentNode as HTMLElement;
			} else {
				reference = document.querySelector(attach) as HTMLElement;
			}
		} else {
			reference = this._toggleElement;
		}

		if (reference) {
			const popper = createPopper(reference as Element | VirtualElement, this._contentElement, this._getPopperConfig());
			Data.set(this._element, 'popper', popper);
		}
	}

	protected _destroyPopper(): void {
		if (Data.has(this._element, 'popper')) {
			(Data.get(this._element, 'popper') as PopperInstance).destroy();
			Data.remove(this._element, 'popper');
		}
	}

	protected __isOpen(): boolean {
		return this._element.classList.contains('open') && this._contentElement.classList.contains('open');
	}

	protected _getPopperConfig(): object {
		// Placement
		let placement = this._getOption('placement') as Placement;
		if (!placement) {
			placement = 'right';
		}

		// Offset
		const offsetValue = this._getOption('offset') as string;
		const offset = offsetValue ? offsetValue.toString().split(',').map(value => parseInt(value.trim(), 10)) : [0, 0];

		// Strategy
		const strategy = this._getOption('overflow') === true ? 'absolute' : 'fixed';
		const altAxis = this._getOption('flip') !== false ? true : false;
		const popperConfig = {
			placement: placement,
			strategy: strategy,
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: offset
					}
				},
				{
					name: 'preventOverflow',
					options: {
						altAxis: altAxis
					}
				},
				{
					name: 'flip',
					options: {
						flipVariations: false
					}
				}
			]
		};

		return popperConfig;
	}

	protected _getToggleElement(): HTMLElement {
		return this._toggleElement;
	}

	protected _getContentElement(): HTMLElement {
		return this._contentElement;
	}

	// General Methods
	public click(event: Event): void {
		this._click(event);
	}

	public mouseover(): void {
		this._mouseover();
	}

	public mouseout(): void {
		this._mouseout();
	}

	public show(): void {
		return this._show();
	}

	public hide(): void {
		this._hide();
	}

	public toggle(): void {
		this._toggle();
	}

	public getToggleElement(): HTMLElement {
		return this._toggleElement;
	}

	public getContentElement(): HTMLElement {
		return this._contentElement;
	}

	public isPermanent(): boolean {
		return this._getOption('permanent') as boolean;
	}

	public disable(): void {
		this._disabled = true;
	}

	public enable(): void {
		this._disabled = false;
	}

	public isOpen(): boolean {
		return this._isOpen;
	}

	// Statics methods
	public static getElement(reference: HTMLElement): HTMLElement {
		if (reference.hasAttribute('data-dropdown')) return reference;

		const findElement = reference.closest('[data-dropdown]') as HTMLElement;
		if (findElement) return findElement;

		if (reference.classList.contains('dropdown-content') && Data.has(reference, 'dropdownElement')) {
			return Data.get(reference, 'dropdownElement') as HTMLElement;
		}

		return null;
	}

	public static getInstance(element: HTMLElement): Dropdown {
		element = this.getElement(element);

		if (!element) return null;

		if (Data.has(element, 'dropdown')) {
			return Data.get(element, 'dropdown') as Dropdown;
		}

		if (element.getAttribute('data-dropdown') === "true") {
			return new Dropdown(element);
		}

		return null;
	}

	public static getOrCreateInstance(element: HTMLElement, config?: DropdownConfigInterface): Dropdown {
		return this.getInstance(element) || new Dropdown(element, config);
	}

	public static update(): void {
		document.querySelectorAll('.open[data-dropdown]').forEach((item) => {
			if (Data.has(item as HTMLElement, 'popper')) {
				(Data.get(item as HTMLElement, 'popper') as PopperInstance).forceUpdate();
			}
		});
	}

	public static hide(skipElement?: HTMLElement): void {
		document.querySelectorAll('.open[data-dropdown]').forEach((item) => {
			if (skipElement && (skipElement === item || item.contains(skipElement))) return;

			const dropdown = Dropdown.getInstance(item as HTMLElement);
			if (dropdown) dropdown.hide();
		});
	}

	public static handleClickAway() {
		document.addEventListener('click', (event: Event) => {
			document.querySelectorAll('.open[data-dropdown]').forEach((element) => {
				const dropdown = Dropdown.getInstance(element as HTMLElement);

				if (dropdown && dropdown.isPermanent() === false) {
					const contentElement = dropdown.getContentElement();

					if (element === event.target || element.contains(event.target as HTMLElement)) {
						return;
					}

					if (contentElement && (contentElement === event.target || contentElement.contains(event.target as HTMLElement))) {
						return;
					}

					dropdown.hide();
				}
			});
		});
	}

	public static handleKeyboard() {

	}

	public static handleMouseover() {
		EventHandler.on(
			document.body,
			'.dropdown-toggle',
			'mouseover',
			(event: Event, target: HTMLElement) => {
				const dropdown = Dropdown.getInstance(target);

				if (dropdown !== null && dropdown.getOption('trigger') === 'hover') {
					return dropdown.mouseover();
				}
			}
		);
	}

	public static handleMouseout() {
		EventHandler.on(
			document.body,
			'.dropdown-toggle',
			'mouseout',
			(event: Event, target: HTMLElement) => {
				const dropdown = Dropdown.getInstance(target);

				if (dropdown !== null && dropdown.getOption('trigger') === 'hover') {
					return dropdown.mouseout();
				}
			}
		);
	}

	public static handleClick() {
		EventHandler.on(
			document.body,
			'.dropdown-toggle',
			'click',
			(event: Event, target: HTMLElement) => {
				const dropdown = Dropdown.getInstance(target);
				if (dropdown) {
					return dropdown.click(event);
				}
			}
		);
	}

	public static handleDismiss() {
		EventHandler.on(
			document.body,
			'[data-dropdown-dismiss]',
			'click',
			(event: Event, target: HTMLElement) => {
				const dropdown = Dropdown.getInstance(target);
				if (dropdown) {
					return dropdown.hide();
				}
			}
		);
	}

	public static initHandlers(): void {
		this.handleClickAway();
		this.handleKeyboard();
		this.handleMouseover();
		this.handleMouseout();
		this.handleClick();
		this.handleDismiss();
	}

	public static createInstances(): void {
		const elements = document.querySelectorAll('[data-dropdown="true"]');
		elements.forEach((element) => {
			new Dropdown(element as HTMLElement);
		});
	}

	public static init(): void {
		Dropdown.createInstances();

		if (window._DROPDOWN_INITIALIZED !== true) {
			Dropdown.initHandlers();
			window._DROPDOWN_INITIALIZED = true;
		}
	}
}