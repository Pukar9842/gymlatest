export interface ToggleConfigInterface {
	target?: string,
	activeClass?: string,
	class?: string,
	removeClass?: string,
	attribute?: string
}

export interface ToggleInterface {		
	toggle(): void;
	update(): void;
	isActive(): boolean;
}