export interface ScrolltoConfigInterface {
	smooth: boolean,
	parent: string,
	target: string,
  offset: number
}

export interface ScrolltoInterface {	
	scroll(): void;	
}