import { RandomCronGenerator } from './RandomCronGenerator';
import { RandomCronConfig } from './types/cron.types';

export { RandomCronGenerator } from './RandomCronGenerator';

interface GenerateRandomCronOptions {
	randomConfig?: RandomCronConfig;
	log?: boolean;
}
export const generateRandomCron = ({
	randomConfig = {
		minute: true,
		hour: true,
		dayOfMonth: true,
		month: true,
		dayOfWeek: true,
	},
	log = false,
}: GenerateRandomCronOptions) => {
	const cronGenerator = new RandomCronGenerator({ randomConfig, log });
	return cronGenerator.generateRandomCron();
};

export const getNextRunTime = (cronExpression: string) => {
	const cronGenerator = new RandomCronGenerator();
	return cronGenerator.getNextRunTime(cronExpression);
};
