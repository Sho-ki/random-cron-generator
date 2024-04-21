export type CronField = keyof RandomCronConfig;

export interface CronFieldRangeConfig {
	min: number;
	max: number;
}

export type CronFieldSpecification = boolean | string | number | CronFieldRangeConfig;

export interface RandomCronConfig {
	minute?: CronFieldSpecification;
	hour?: CronFieldSpecification;
	dayOfMonth?: CronFieldSpecification;
	month?: CronFieldSpecification;
	dayOfWeek?: CronFieldSpecification;
}
