export interface CollapseConfigInterface {
	hiddenClass: string;
	activeClass: string;
	target: string;
}

export interface CollapseInterface {	
	collapse(): void;	
	expand(): void;
	isOpen(): boolean;
}