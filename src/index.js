// @flow

import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days'
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import compareAsc from 'date-fns/compare_asc';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day'

type MeasureType = 'days' | 'weeks' | 'months' | 'years' | 'daysOfWeek' | 'daysOfMonth';

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
    // remove same from array
    this.start = new Date(start);
    this.units = units;
    this.measure = measure;
  }

  next(times: number) {
    const res = [];
    for(let i = 1; i <= times; i++) {
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
            res.push(addYears(this.start, i * unit))
            break;
          case 'daysOfWeek':
            const startDay = getDay(this.start);
            let start;
            if (unit === startDay) {
              start = this.start
            } else if (unit > startDay) {
              start = subDays(this.start, (7 - unit + startDay))
            } else {
              start = subDays(this.start, (startDay - unit))
            }
            res.push(addDays(start, i * 7));
            break;
        }
      }
    }

    if (this.units.length > 1) {
      res.sort(compareAsc);
    }
    return res.slice(0, times).map(date => format(date, 'YYYY-MM-DD'))
  }
}

export default EveryDate;
