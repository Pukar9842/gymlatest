export interface ModalConfigInterface {
	zindex?: string,
	backdrop: boolean,
  backdropClass: string,
	backdropStatic: boolean,
  keyboard: boolean,
	disableScroll: boolean,
	persistent: boolean;
	focus: boolean;
	hiddenClass: string;
}
export interface ModalInterface {	
	show(): void;	
	hide(): void;
	toggle(): void;
}