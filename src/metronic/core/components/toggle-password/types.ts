export interface TogglePasswordConfigInterface {
	permanent?: boolean
}

export interface TogglePasswordInterface {		
	toggle(): void;
	isVisible(): boolean;
}