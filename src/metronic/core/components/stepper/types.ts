export interface StepperConfigInterface {
	hiddenClass: string,
	activeStep: number
}

export interface StepperInterface {		
	go(step: number): void;
}