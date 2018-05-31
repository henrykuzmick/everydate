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
import isBefore from 'date-fns/is_before'; 
import isAfter from 'date-fns/is_after'; 
import isSameDay from 'date-fns/is_same_day'; 

type MeasureType = 'days' | 'weeks' | 'months' | 'years' | 'daysOfWeek' | 'daysOfMonth';

type Props = {|
  start: Date | string,
  end?: Date | string,
  units?: Array<number>,
  measure: MeasureType,
  returnDates?: boolean,
  moves?: Array<{ from: Date| string, to: Date | string }>
|}

const everydate = (props: Props) => ({
  start: props.start ? new Date(props.start) : new Date(),
  end: props.end ? new Date(props.end) : null,
  units: props.units ? props.units : [],
  measure: props.measure ? props.measure : null,
  returnDates: props.returnDates ? props.returnDates : false,
  moves: props.moves ? props.moves : [],

  getStart() {
    return format(this.start, 'YYYY-MM-DD');
  },

  getEnd() {
    return format(this.end, 'YYYY-MM-DD');
  },

  getUnits() {
    return this.units;
  },

  getMeasure() {
    return this.measure;
  },

  setStart(start: string | Date) {
    this.start = new Date(start);
  },

  setEnd(end: string | Date) {
    this.end = end ? new Date(end) : null;
  },

  setUnits(units: Array<number>) {
    this.units = units;
  },

  setMeasure(measure: MeasureType) {
    this.measure = measure;
  },

  isRecurring() {
    return this.units.length > 0 && this.measure !== null;
  },

  all({from, to}: {from: string | Date, to: string | Date} = {}) {
    let res = [];
    let end = this.end;
    if (to) {
      if (!end || isBefore(to, end)) {
        end = to;
      }
    }
    if (end === null) {
      res.push(this.start);
    } else if (!this.isRecurring()) {
      res.push(this.start);
      res.push(end);
    } else {
      for (let j = 0; j < this.units.length; j++) {
        const unit = this.units[j];
        let testDate = this.start;
        switch (this.measure) {
          case 'days':
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addDays(testDate, unit);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          case 'weeks':
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addDays(testDate, unit * 7);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          case 'months':
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addMonths(testDate, unit);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          case 'years':
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addYears(testDate, unit);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          case 'daysOfWeek': {
            const startDay = getDay(this.start);
            if (unit > startDay) {
              testDate = addDays(this.start, unit - startDay);
            } else if (unit < startDay) {
              testDate = addDays(this.start, 7 - startDay + unit);
            }
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addDays(testDate, 7);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          }
          case 'daysOfMonth': {
            const startDay = getDate(this.start);
            if (unit > startDay) {
              testDate = addDays(this.start, unit - startDay);
            } else if (unit < startDay) {
              testDate = addMonths(subDays(this.start, startDay - unit), 1);
            }
            while (isBefore(testDate, end)) {
              res.push(testDate);
              testDate = addMonths(testDate, 1);
            }
            if (isSameDay(testDate, end)) {
              res.push(testDate);
            }
            break;
          }
        }
      }
    }

    if (from) {
      res = res.filter(d => {
        return isAfter(d, from) || isSameDay(d, from);
      });
    }

    if(this.moves.length !== 0) {
      this.moves.map(move => {
        const filtered = res.filter(d => !isSameDay(d, move.from));
        if (filtered.length !== res.length) {
          res = filtered;
          res.push(move.to);
        }
      });
    }

    res.sort(compareAsc);

    if (this.returnDates) {
      return Array.from(new Set(res));
    }

    return Array.from(new Set(res.map(date => format(date, 'YYYY-MM-DD'))));
  },

  next(times: number) {
    let res = [];
    if (!this.isRecurring()) {
      res.push(this.start);
    } else {
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
    }

    if (this.units.length > 1) {
      res.sort(compareAsc);
    }

    if (this.end !== null) {
      res = res.filter(date => !isAfter(date, this.end));
    }

    if (this.returnDates) {
      return Array.from(new Set(res)).slice(0, times);
    }

    return Array.from(
      new Set(res.map(date => format(date, 'YYYY-MM-DD')))
    ).slice(0, times);
  },

  match(date: Date | string) {
    const all = this.all({ from: subDays(date, 1), to: addDays(date, 1) });
    return all.includes(format(date, 'YYYY-MM-DD'));
  },

  toWords() {
    if(!this.isRecurring()) {
      return format('')
    }
  }
});

export default everydate;
