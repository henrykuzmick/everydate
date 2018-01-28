const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const addWeeks = require('date-fns/add_weeks');
const addMonths = require('date-fns/add_months');
const addYears = require('date-fns/add_years');
const compareAsc = require('date-fns/compare_asc');
const format = require('date-fns/format');
const getDay = require('date-fns/get_day');
const getDate = require('date-fns/get_date');
const getMonth = require('date-fns/get_month');
const isBefore = require('date-fns/is_before');
const isAfter = require('date-fns/is_after');
const differenceInDays = require('date-fns/difference_in_days');
const differenceInMonths = require('date-fns/difference_in_months');
const differenceInYears = require('date-fns/difference_in_years');
const isSameDay = require('date-fns/is_same_day');

const everydate = props => ({
  start: props.start ? new Date(props.start) : new Date(),
  end: props.end ? new Date(props.end) : null,
  units: props.units ? props.units : [],
  measure: props.measure ? props.measure : null,
  returnDates: props.returnDates ? props.returnDates : false,

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

  setStart(start) {
    this.start = new Date(start);
  },

  setEnd(end) {
    this.end = end ? new Date(end) : null;
  },

  setUnits(units) {
    this.units = units;
  },

  setMeasure(measure) {
    this.measure = measure;
  },

  isRecurring() {
    return this.units.length > 0 && this.measure !== null;
  },

  all() {
    const res = [];
    if (this.end === null) {
      res.push(this.start);
    } else if (!this.isRecurring()) {
      res.push(this.start);
      res.push(this.end);
    } else {
      for (let j = 0; j < this.units.length; j++) {
        const unit = this.units[j];
        let testDate = this.start;
        switch (this.measure) {
          case 'days':
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addDays(testDate, unit);
            }
            if (isSameDay(testDate, this.end)) {
              res.push(testDate);
            }
            break;
          case 'weeks':
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addDays(testDate, unit * 7);
            }
            if (isSameDay(testDate, this.end)) {
              res.push(testDate);
            }
            break;
          case 'months':
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addMonths(testDate, unit);
            }
            if (isSameDay(testDate, this.end)) {
              res.push(testDate);
            }
            break;
          case 'years':
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addYears(testDate, unit);
            }
            if (isSameDay(testDate, this.end)) {
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
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addDays(testDate, 7);
            }
            if (isSameDay(testDate, this.end)) {
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
            while (isBefore(testDate, this.end)) {
              res.push(testDate);
              testDate = addMonths(testDate, 1);
            }
            if (isSameDay(testDate, this.end)) {
              res.push(testDate);
            }
            break;
          }
        }
      }
    }

    if (this.units.length > 1) {
      res.sort(compareAsc);
    }

    if (this.returnDates) {
      return Array.from(new Set(res));
    }

    return Array.from(new Set(res.map(date => format(date, 'YYYY-MM-DD'))));
  },

  next(times, options = {}) {
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

  match(date) {
    const testDate = new Date(date);
    if (isBefore(testDate, this.start)) {
      return false;
    }

    if (this.end !== null) {
      if (isAfter(testDate, this.end)) {
        return false;
      }
    }

    if (!this.isRecurring()) {
      if (isSameDay(testDate, this.start)) {
        return true;
      }
      if (isSameDay(testDate, this.end)) {
        return true;
      }
    } else {
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
    }
    return false;
  }
});

module.exports = everydate;
