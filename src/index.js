// @flow

import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import compareAsc from 'date-fns/compare_asc';
import format from 'date-fns/format';

type RuleType = 'days' | 'weeks';

type Props = {
  start: string,
  units: Array<number>,
  rule: RuleType
};

class EveryDate {
  start: Date;
  units: Array<number>;
  rule: RuleType;

  constructor({ start, units, rule }: Props) {
    this.start = new Date(start);
    this.units = units;
    this.rule = rule;
  }

  next(times: number) {
    const res = [];
    let i = 1;
    while (res.length < times) {
      for (let j = 0; j < this.units.length; j++) {
        switch (this.rule) {
          case 'days':
            res.push(
              format(addDays(this.start, i * this.units[j]), 'YYYY-MM-DD')
            );
            break;
          case 'weeks':
            res.push(
              format(addWeeks(this.start, i * this.units[j]), 'YYYY-MM-DD')
            );
            break;
        }
      }
      i++;
    }
    if (this.units.length > 1) {
      res.sort(compareAsc);
    }
    return res.slice(0, times);
  }
}

export default EveryDate;
