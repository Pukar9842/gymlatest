export declare type TooltipTriggerType = 'hover' | 'click' | 'focus';

export interface TooltipConfigInterface {
	hiddenClass: string;
	target: string;
	trigger: string,
	container: string,
	placement: string,
	strategy: string,
	permanent: boolean,
	offset: string,
	delayShow: number,
	delayHide: number,
	zindex: string,
}

export interface TooltipInterface {		
	show(): void;
	hide(): void;
	toggle(): void;
}