import { RandomCronGenerator } from '../src';
import { RandomCronConfig } from '../src/types/cron.types';

describe('RandomCronGenerator generateRandomCron Method', () => {
	it('should generate a valid cron string with default settings', () => {
		const generator = new RandomCronGenerator();
		const cron = generator.generateRandomCron();
		expect(cron).toMatch(/^\d{1,2} \d{1,2} \d{1,2} \d{1,2} \d{1}$/);
	});

	it('should generate a valid cron string. Only minute field is random', () => {
		const generator = new RandomCronGenerator({
			randomConfig: {
				minute: true,
				hour: {
					min: 8,
					max: 8,
				},
				dayOfMonth: '*',
				month: '*',
				dayOfWeek: '*',
			},
		});
		const cron = generator.generateRandomCron();
		expect(cron).toMatch(/^\d{1,2} 8 \* \* \*$/);
	});

	it('should generate a valid cron string with custom settings (minute)', () => {
		const generator = new RandomCronGenerator({
			randomConfig: {
				minute: { min: 5, max: 5 },
				hour: '*',
				dayOfMonth: '*',
				month: '*',
				dayOfWeek: '*',
			},
		});
		const cron = generator.generateRandomCron();
		expect(cron).toMatch(/^5 \* \* \* \*/);
	});

	it('should handle custom random configurations', () => {
		const randomConfig: RandomCronConfig = {
			minute: { min: 5, max: 5 },
			hour: '*',
			dayOfMonth: '*',
			month: '*',
			dayOfWeek: { min: 1, max: 1 },
		};
		const generator = new RandomCronGenerator({ randomConfig });
		const cron = generator.generateRandomCron();
		expect(cron).toBe('5 * * * 1');
	});

	it('throws an error for an invalid minute field configuration', () => {
		const randomConfig: RandomCronConfig = {
			minute: 100, // Invalid value
			hour: 23,
			dayOfMonth: '*',
			month: '*',
			dayOfWeek: '*',
		};
		const generator = new RandomCronGenerator({ randomConfig });
		expect(() => generator.generateRandomCron()).toThrow();
	});

	it('throws an error for an invalid hour field configuration', () => {
		const randomConfig: RandomCronConfig = {
			minute: 1,
			hour: 25, // Invalid value
			dayOfMonth: '*',
			month: '*',
			dayOfWeek: '*',
		};
		const generator = new RandomCronGenerator({ randomConfig });
		expect(() => generator.generateRandomCron()).toThrow();
	});

	it('throws an error for an invalid dayOfMonth field configuration', () => {
		const randomConfig: RandomCronConfig = {
			minute: 10,
			hour: 23,
			dayOfMonth: 'invalid', // Invalid value
			month: '*',
			dayOfWeek: '*',
		};
		const generator = new RandomCronGenerator({ randomConfig });
		expect(() => generator.generateRandomCron()).toThrow();
	});

	it('throws an error for an invalid month field configuration', () => {
		const randomConfig: RandomCronConfig = {
			minute: 10,
			hour: 23,
			dayOfMonth: 11,
			month: '**', // Invalid value
			dayOfWeek: '*',
		};
		const generator = new RandomCronGenerator({ randomConfig });
		expect(() => generator.generateRandomCron()).toThrow();
	});

	it('throws an error for an invalid dayOfWeek field configuration', () => {
		const randomConfig: RandomCronConfig = {
			minute: 10,
			hour: 23,
			dayOfMonth: 11,
			month: '*',
			dayOfWeek: 'invalid', // Invalid value
		};
		const generator = new RandomCronGenerator({ randomConfig });

		expect(() => generator.generateRandomCron()).toThrow();
	});
});
