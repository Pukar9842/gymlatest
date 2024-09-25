export declare type DismissModeType = 'remove' | 'hide';

export interface DismissConfigInterface {
	hiddenClass: string;
	target: string;
	interrupt: boolean;
	mode?: DismissModeType;
}

export interface DismissInterface {	
	dismiss(): void;	
}