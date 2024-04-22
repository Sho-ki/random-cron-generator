import { RandomCronGenerator } from './RandomCronGenerator';
import { RandomCronConfig } from './types/cron.types';

export { RandomCronGenerator } from './RandomCronGenerator';

export const generateRandomCron = (
	randomConfig: RandomCronConfig = {
		minute: true,
		hour: true,
		dayOfMonth: true,
		month: true,
		dayOfWeek: true,
	},
	log: boolean = false
) => {
	const cronGenerator = new RandomCronGenerator({ randomConfig, log });
	return cronGenerator.generateRandomCron();
};

export const getNextRunTime = (cronExpression: string) => {
	const cronGenerator = new RandomCronGenerator();
	return cronGenerator.getNextRunTime(cronExpression);
};
