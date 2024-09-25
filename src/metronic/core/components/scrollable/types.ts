export interface ScrollableConfigInterface {
	save: boolean,
	dependencies: string,
	wrappers: string,
  offset: string
}

export interface ScrollableInterface {	
	update(): void;	
	getHeight(): string;
}