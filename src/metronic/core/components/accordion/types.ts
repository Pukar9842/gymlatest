export interface AccordionConfigInterface {
	hiddenClass: string;
	activeClass: string
	expandAll: boolean;
}

export interface AccordionInterface {		
	show(accordionElement: HTMLElement): void;
	hide(accordionElement: HTMLElement): void;
	toggle(accordionElement: HTMLElement): void;
}