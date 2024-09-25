export declare type DropdownTriggerType = 'hover' | 'click';

export interface DropdownConfigInterface {
	zindex: number,
	hoverTimeout: number,
	permanent: boolean,
	dismiss: boolean,
	placement: string,
	attach: string,
	offset: string,
  trigger: DropdownTriggerType,
	hiddenClass: string
}

export interface DropdownInterface {		
	disable(): void;
	enable(): void;
	show(): void;
	hide(): void;
}