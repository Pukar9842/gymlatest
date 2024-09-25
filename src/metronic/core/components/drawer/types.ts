export interface DrawerConfigInterface {
	enable?: boolean,
	class: string,
	zindex?: string,
	hiddenClass: string
	backdrop: boolean,
  backdropClass: string,
	backdropStatic: boolean,
  keyboard: boolean,
	disableScroll: boolean,
	persistent: boolean;
	focus: boolean;
}
export interface DrawerInterface {	
	show(): void;	
	hide(): void;
	toggle(): void;
}