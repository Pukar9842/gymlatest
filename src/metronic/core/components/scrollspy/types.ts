export interface ScrollspyConfigInterface {
	target: string,
	smooth: boolean,
	offset: number
}

export interface ScrollspyInterface {	
	update(anchorElement: HTMLElement, event: Event): void;	
	scrollTo(anchorElement: HTMLElement): void;
}