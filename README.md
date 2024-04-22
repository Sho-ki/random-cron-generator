# Random Cron Generator

This package provides tools to generate random cron expressions based on configurable parameters and calculate the next run time for any given cron expression. It uses `cron-validate` to ensure generated cron expressions are valid and `cron-parser` integrated with `luxon` for calculating run times.

## Features

- Generate random cron expressions with configurable settings.
- Validate cron expressions for correctness.
- Calculate the next run time of a cron expression.
- Optional logging of next run times during cron generation.

## Installation

Install the package with npm:

```bash
npm install random-cron-generator
```


## Usage
### Importing the module
```typescript
import { RandomCronGenerator, generateRandomCron, getNextRunTime } from 'random-cron-generator';
```

### Generating a Random Cron Expression
```typescript
// Generate a cron expression with default settings:
const cronExpression = generateRandomCron();
console.log(cronExpression); // Outputs a valid cron string (e.g. '0 0 * * *')

// Generate a cron expression with custom settings:
const customCronExpression = generateRandomCron({
    randomConfig: {
        minute: { min: 0, max: 59 }, // range of minutes
        hour: true, // random hour. If false, it will be * (default)
        dayOfMonth: '*/7', // string cron expression
        month: 5, // specific month
        dayOfWeek: undefined // * (default)
    },
    log: true // log the next run time
    }
); 
console.log(customCronExpression); // Outputs a valid cron string and logs the next run time (e.g. '33 * 1 10 *')
```

