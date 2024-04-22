import { DateTime } from 'luxon';
import cron from 'cron-validate';
import { parseExpression } from 'cron-parser';

import { CRON_FIELD_RANGES } from './utils/constants';
import { CronField, RandomCronConfig } from './types/cron.types';

type RandomCronGeneratorConstructor = {
	randomConfig?: RandomCronConfig;
	log?: boolean;
};

export class RandomCronGenerator {
	randomConfig: RandomCronConfig;
	log: boolean;

	constructor({
		randomConfig = {
			minute: true,
			hour: true,
			dayOfMonth: true,
			month: true,
			dayOfWeek: true,
		},
		log = false,
	}: RandomCronGeneratorConstructor = {}) {
		this.randomConfig = randomConfig;
		this.log = log;
		this.generateRandomCron = this.generateRandomCron.bind(this);
		this.getNextRunTime = this.getNextRunTime.bind(this);
	}

	/**
	 * Generate a random integer between two values, inclusive.
	 */
	private getRandom(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Check if a value is within the valid range for a given cron field.
	 */
	private isValidCron(cronString: string): [boolean, string[]?] {
		const cronResult = cron(cronString);
		if (cronResult.isValid()) {
			return [true];
		}

		return [false, cronResult.getError()];
	}

	/**
	 * Validate the configuration for the random cron generator.
	 */
	private validateConfig(): void {
		const fields: CronField[] = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];
		fields.forEach((field) => {
			const config = this.randomConfig[field];
			if (config instanceof Object && !(config instanceof Array) && 'min' in config && 'max' in config) {
				const [minRange, maxRange] = CRON_FIELD_RANGES[field];
				if (config.min < minRange || config.max > maxRange) {
					throw new Error(`Invalid range for ${field}: [${config.min}, ${config.max}]`);
				}
			}
		});
	}

	/**
	 * Generate a cron string with specified fields set to random values.
	 * @returns A cron string with random values for the specified fields.
	 */
	public generateRandomCron(): string {
		this.validateConfig();
		const cronFields: CronField[] = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];

		const cronParts = [];
		for (const field of cronFields) {
			const config = this.randomConfig[field];
			if (config === true) {
				cronParts.push(this.generateRandomValueForField(field));
			} else if (!config || config === '*') {
				cronParts.push('*');
			} else if (typeof config === 'number') {
				cronParts.push(config.toString());
			} else if (typeof config === 'string') {
				cronParts.push(config);
			} else if (config instanceof Object && !(config instanceof Array)) {
				cronParts.push(this.getRandom(config.min, config.max).toString());
			} else {
				throw new Error(`Invalid config for ${field}: ${config}`);
			}
		}

		const nextCron = cronParts.join(' ');

		const [isValid, error] = this.isValidCron(nextCron);
		if (!isValid) {
			throw new Error(`Invalid cron string: ${nextCron}. Errors: ${error}`);
		}

		if (this.log) {
			const nextRunTime = this.getNextRunTime(nextCron);
			console.log(`Next run time: ${nextRunTime.toISO()}`);
		}
		return nextCron;
	}

	private generateRandomValueForField(field: CronField): string {
		if (field === 'dayOfMonth') {
			return this.handleDayOfMonth();
		}
		const [min, max] = CRON_FIELD_RANGES[field];
		return this.getRandom(min, max).toString();
	}

	private handleDayOfMonth(): string {
		const monthConfig = this.randomConfig.month;
		if (monthConfig && typeof monthConfig === 'number') {
			const daysInMonth = this.getDaysInMonth(monthConfig);
			return this.getRandom(1, daysInMonth).toString();
		}
		return this.getRandom(1, 31).toString(); // Default to 31 days
	}

	private getDaysInMonth(month: number): number {
		const year = DateTime.now().year;
		const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
		const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return daysInMonth[month - 1] as number;
	}

	/**
	 * Calculate the next run time for a given cron string using cron-parser and luxon for date handling.
	 * @param cronString - The cron string to calculate the next run time for.
	 * @returns A DateTime object representing the next run time.
	 */
	public getNextRunTime(cronString: string): DateTime {
		const interval = parseExpression(cronString);
		const nextDate = interval.next().toDate();
		return DateTime.fromJSDate(nextDate);
	}
}
