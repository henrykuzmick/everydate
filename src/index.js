// @flow

import addDays from 'date-fns/add_days';

type RuleType = 'days' | 'weeks'

type Props = {
  start: Date,
  units: Array<number>,
  rule: RuleType
}

class EveryDate {
  start: Date
  units: Array<number>
  rule: RuleType

  constructor({ start, units, rule } : Props) {
    this.start = start;
    this.units = units;
    this.rule = rule;
  }

  next(times: number) {
    const res = [];
    for (let i = 1; i <= times; i++) {
      switch(this.rule) {
        case 'days':
          res.push(addDays(this.start, i*this.units[0]))
      }
    }
    return res;
  }
}

export default EveryDate;