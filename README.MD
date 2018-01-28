# Everydate

[![Build Status](https://circleci.com/gh/henrykuzmick/everydate.svg?&style=shield&circle-token=b2e9c2446fa622e504f2dd8ae9bd805ab8954384)](https://circleci.com/gh/henrykuzmick/everydate)
[![npm version](https://badge.fury.io/js/everydate.svg)](https://badge.fury.io/js/everydate)

Everydate is a simple date recurrence tool.
It allows you to calculate next days for a recurrence, 
match dates for it and get all recurring days between a start and end date.

## Getting started

everydate can be installed with npm and required into a script.
```js
import everydate from 'everydate'
```

## Example

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days'
});

recur.next(3) // [2018-02-10, 2018-02-12, 2018-02-14]
recur.match('2018-02-12') // true
recur.match('2018-02-13') // false
recur.all() // [2018-02-10, 2018-02-12, 2018-02-14, 2018-02-16]
recur.isRecurring() // true
```

## Usage

Both input for start and end days use date string in the format of `YYYY-MM-DD`
This helps dismissing time from the results, which is not handled by this module,
and enforces the idea that you can then use whatever date library you want for other tasks.

There is a date-fns dependency however, so you may as well use that, as it's awesome. ❤️

## Creating an everydate object

Creating a recurrence object requires a start date, an array of units and a measure type.

```js
start: string | Date, // default new Date()
end: string | Date, // default null
units: Array<number>, // default []
measure: enum // days, weeks, months, years, daysOfWeek, daysOfMonth, default null
returnDates: boolean // return an array of Dates instead of strings, default false.
```

For example, if you want a recurrence of every 3 days
```js
const recur = everydate({
  start: '2018-02-10',
  units: [3],
  measure: 'days'
});
```

A recursion for every 2 AND 5 days
```js
const recur = everydate({
  start: '2018-02-10',
  units: [2, 5],
  measure: 'days'
});
```

A recursion for every Tuesday
```js
const recur = everydate({
  start: '2018-02-10',
  units: [2],
  measure: 'daysOfWeek'
});
```

A recursion for every Tuesday and Friday
```js
const recur = everydate({
  start: '2018-02-10',
  units: [2, 5],
  measure: 'daysOfWeek'
});
```

A recursion for every 15th of the month
```js
const recur = everydate({
  start: '2018-02-10', // if start date is before first day of recurrence it will not be outputted in the results.
  units: [15],
  measure: 'daysOfMonth'
});
```

## Getting next dates

After creating the object you can get next days from it.
This is the point of the module ¯\_(ツ)_/¯

If an end date is provided `next()` will only give dates until the end date, 
even if a larger number is provided.

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days'
});

recur.next(3) // [2018-02-10, 2018-02-12, 2018-02-14]
```

## Getting all dates

If both a start date and an end date are given, you can call `all()` to get all given.

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days'
});

recur.all() // [2018-02-10, 2018-02-12, 2018-02-14, 2018-02-16]
```

## Matching dates

You can check if a given date matches your everydate object using `match()`

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days'
});

recur.match('2018-02-12') // true
recur.match('2018-02-13') // false
```

## Getting and Setting values

After creating an everydate object you can get and set all props

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days'
});

recur.setStart('2018-02-12');
recur.setEnd('2018-05-10');
recur.setUnits([5]);
recur.setMeasure('weeks');

recur.getStart(); // '2018-02-12'
recur.getEnd(); // '2018-05-10'
recur.getUnits(); // [5]
recur.getMeasure(); // 'weeks'
```

## Helper functions

You can check if the everydate object is recurring, i.e. it has a measure and a filled array of units.

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
});
recur.isRecurring() // false
```

## Options

If you prefer to get an array of Dates instead of strings you can set `returnDates` to `true`.
Keep in mind that dates have time information which this package ignores, 
but in some cases you may get unexpected results, for example if a recursion passes daylight savings dates you would get the correct date, but your time values would shift by an hour.

```js
const recur = everydate({
  start: '2018-02-10',
  end: '2018-02-17'
  units: [2],
  measure: 'days',
  returnDates: true
});
```

## Licence

MIT