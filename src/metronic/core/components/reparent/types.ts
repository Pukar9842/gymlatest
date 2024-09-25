export declare type OverlayModeType = 'drawer' | 'modal' | 'popover';

export interface ReparentConfigInterface {
	mode: string,
	target: string
}

export interface ReparentInterface {		
	update(): void;
}