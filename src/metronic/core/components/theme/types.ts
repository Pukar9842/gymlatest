export declare type ThemeModeType = 'light' | 'dark' | 'system';

export interface ThemeConfigInterface {
	mode: ThemeModeType,
	class: boolean,
	attribute: string
}

export interface ThemeInterface {
	setMode(mode: ThemeModeType): void;
	getMode(): ThemeModeType;
}