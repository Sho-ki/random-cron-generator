import { CronField } from '../types/cron.types';

export type CronRange = [number, number];

export type CronFieldRanges = {
	[key in CronField]: CronRange;
};

export const CRON_FIELD_RANGES: CronFieldRanges = {
	minute: [0, 59],
	hour: [0, 23],
	dayOfMonth: [1, 31],
	month: [1, 12],
	dayOfWeek: [0, 6],
};
