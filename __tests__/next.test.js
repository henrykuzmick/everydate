import Everydate from '../src';

describe('getting next days', () => {
  it('should parse next with days', () => {
    const recur = new Everydate({
      start: new Date('2018-02-10'),
      units: [1],
      rule: 'days'
    });
    const expected = [
      '2018-02-11',
      '2018-02-12',
      '2018-02-13',
      '2018-02-14',
      '2018-02-15'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should parse next with larger days', () => {
    const recur = new Everydate({
      start: new Date('2018-02-10'),
      units: [3],
      rule: 'days'
    });
    const expected = [
      '2018-02-13',
      '2018-02-16',
      '2018-02-19',
      '2018-02-22',
      '2018-02-25'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should parse multiple days', () => {
    const recur = new Everydate({
      start: new Date('2018-02-10'),
      units: [3, 5],
      rule: 'days'
    });
    const expected = [
      '2018-02-13',
      '2018-02-15',
      '2018-02-16',
      '2018-02-19',
      '2018-02-20'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});

describe('getting next weeks', () => {
  it('should get next weeks', () => {
    const recur = new Everydate({
      start: new Date('2018-09-30'),
      units: [1],
      rule: 'weeks'
    });
    const expected = [
      '2018-10-07',
      '2018-10-14',
      '2018-10-21',
      '2018-10-28',
      '2018-11-04'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should get multiple next weeks', () => {
    const recur = new Everydate({
      start: new Date('2018-02-10'),
      units: [3, 5],
      rule: 'weeks'
    });
    const expected = [
      '2018-03-03',
      '2018-03-17',
      '2018-03-24',
      '2018-04-14',
      '2018-04-21'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});
