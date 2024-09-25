export interface StickyConfigInterface {
	name: string,
	class: string,
	zindex: string,
	top: string,
	left: string,
	right: string,
	width: string | number | object,
	offset: number,
	reverse: boolean,
	release: string,
	activate: string
}

export interface StickyInterface {		
	update(): void;
}