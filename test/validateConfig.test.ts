import { RandomCronGenerator } from '../src';

describe('RandomCronGenerator Validation', () => {
	it('should throw an error if minute range is invalid', () => {
		const config = {
			randomConfig: {
				minute: { min: 0, max: 200 }, // Invalid range
			},
		};
		expect(() => new RandomCronGenerator(config).generateRandomCron()).toThrow('Invalid range for minute: [0, 200]');
	});

	it('should throw an error if hour range is invalid', () => {
		const config = {
			randomConfig: {
				hour: { min: 0, max: 24 }, // Invalid range
			},
		};
		expect(() => new RandomCronGenerator(config).generateRandomCron()).toThrow('Invalid range for hour: [0, 24]');
	});

	it('does not throw an error for valid ranges', () => {
		const config = {
			randomConfig: {
				minute: { min: 0, max: 59 },
				hour: { min: 0, max: 23 },
				dayOfMonth: { min: 1, max: 31 },
				month: { min: 1, max: 12 },
				dayOfWeek: { min: 0, max: 6 },
			},
		};
		expect(() => new RandomCronGenerator(config).generateRandomCron()).not.toThrow();
	});
});
``;
