// @flow

import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import compareAsc from 'date-fns/compare_asc';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInMonths from 'date-fns/difference_in_months';
import differenceInYears from 'date-fns/difference_in_years';
import isSameDay from 'date-fns/is_same_day';

type MeasureType =
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'daysOfWeek'
  | 'daysOfMonth';

type Props = {
  start: string,
  units: Array<number>,
  measure: MeasureType
};

class EveryDate {
  start: Date;
  units: Array<number>;
  measure: MeasureType;

  constructor({ start, units, measure }: Props) {
    // TODO: remove same from array
    this.start = new Date(start);
    this.units = units;
    this.measure = measure;
  }

  next(times: number, options: Object = {}) {
    // const startDate = options.startDate ? new Date(options.startDate) : this.start;
    const res = [];
    for (let i = 0; i <= times; i++) {
      for (let j = 0; j < this.units.length; j++) {
        const unit = this.units[j];
        switch (this.measure) {
          case 'days':
            res.push(addDays(this.start, i * unit));
            break;
          case 'weeks':
            res.push(addWeeks(this.start, i * unit));
            break;
          case 'months':
            res.push(addMonths(this.start, i * unit));
            break;
          case 'years':
            res.push(addYears(this.start, i * unit));
            break;
          case 'daysOfWeek':
            const startDay = getDay(this.start);
            let start;
            if (unit === startDay) {
              start = this.start;
            } else if (unit > startDay) {
              start = addDays(this.start, unit - startDay);
            } else {
              start = addDays(this.start, 7 - startDay + unit);
            }
            res.push(addDays(start, i * 7));
            break;
          case 'daysOfMonth': {
            const startDay = getDate(this.start);
            let start;
            if (unit === startDay) {
              start = this.start;
            } else if (unit > startDay) {
              start = addDays(this.start, unit - startDay);
            } else {
              start = addMonths(subDays(this.start, startDay - unit), 1);
            }
            res.push(addMonths(start, i));
            break;
          }
        }
      }
    }

    if (this.units.length > 1) {
      res.sort(compareAsc);
    }

    return Array.from(
      new Set(res.map(date => format(date, 'YYYY-MM-DD')))
    ).slice(0, times);
  }

  match(date: string) {
    const testDate = new Date(date);
    if (isBefore(testDate, this.start)) {
      return false;
    }

    const diffInDays = differenceInDays(this.start, testDate);
    const diffInMonths = differenceInMonths(this.start, testDate);
    const diffInYears = differenceInYears(this.start, testDate);

    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i];
      switch (this.measure) {
        case 'days':
          if (diffInDays % unit === 0) {
            return true;
          }
          break;
        case 'weeks':
          if ((diffInDays % unit) * 7 === 0) {
            return true;
          }
          break;
        case 'months':
          if (diffInMonths % unit === 0) {
            if (getDate(this.start) === getDate(testDate)) {
              return true;
            }
          }
          break;
        case 'years':
          if (diffInYears % unit === 0) {
            if (getMonth(this.start) === getMonth(testDate)) {
              if (getDate(this.start) === getDate(testDate)) {
                return true;
              }
            }
          }
          break;
        case 'daysOfWeek':
          if (unit === getDay(testDate)) {
            return true;
          }
          break;
        case 'daysOfMonth':
          if (unit === getDate(testDate)) {
            return true;
          }
          break;
      }
    }

    // let testDay = this.start;
    // switch(this.measure) {
    //   case 'days': {
    //     while(isBefore(testDay, testDate)) {
    //       for (let j = 0; j < this.units.length; j++) {
    //       }
    //     }
    //   }
    // }
    return false;
  }
}

export default EveryDate;
