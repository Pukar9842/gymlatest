export interface TabsConfigInterface {
	hiddenClass: string
}

export interface TabsInterface {		
	show(tabElement: HTMLElement): void;
	isShown(tabElement: HTMLElement): boolean;
}