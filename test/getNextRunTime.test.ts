import { DateTime } from 'luxon';
import { RandomCronGenerator } from '../src';

jest.mock('cron-parser', () => ({
	parseExpression: jest.fn().mockImplementation(() => ({
		next: jest.fn().mockImplementation(() => ({
			toDate: jest.fn().mockReturnValue(new Date('2024-04-01T00:00:00Z')),
		})),
	})),
}));

describe('RandomCronGenerator getNextRunTime Method', () => {
	it('should calculate the next run time for a cron string', () => {
		const generator = new RandomCronGenerator();
		const nextRunTime = generator.getNextRunTime('* * * * *');
		expect(nextRunTime.toISO()).toBe(DateTime.fromJSDate(new Date('2024-04-01T00:00:00Z')).toISO());
	});
});
