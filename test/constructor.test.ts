import { RandomCronGenerator } from '../src';
import { RandomCronConfig } from '../src/types/cron.types';

describe('RandomCronGenerator Constructor', () => {
	it('should initialize with default parameters', () => {
		const generator = new RandomCronGenerator();
		expect(generator.randomConfig).toEqual({
			minute: true,
			hour: true,
			dayOfMonth: true,
			month: true,
			dayOfWeek: true,
		});
		expect(generator.log).toBeFalsy();
	});

	it('should accept custom configurations', () => {
		const randomConfig: RandomCronConfig = {
			minute: { min: 0, max: 59 },
			hour: false,
			dayOfMonth: '*',
			month: { min: 1, max: 12 },
			dayOfWeek: true,
		};
		const generator = new RandomCronGenerator({ randomConfig, log: true });
		expect(generator.randomConfig).toEqual(randomConfig);
		expect(generator.log).toBeTruthy();
	});
});
