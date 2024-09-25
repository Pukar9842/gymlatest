export declare type MenuItemToggleType = 'dropdown' | 'accordion';

export declare type MenuItemTriggerType = 'hover' | 'click';

export interface MenuConfigInterface {
	dropdownZindex: string,
	dropdownHoverTimeout: number,
  accordionExpandAll: boolean,
}

export interface MenuInterface {		
	disable(): void;
	enable(): void;
	update(): void;
}