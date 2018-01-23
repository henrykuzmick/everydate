import Everydate from '../src';

describe('getting next days', () => {
  it('should parse next with days', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [1],
      measure: 'days'
    });
    const expected = [
      '2018-02-10',
      '2018-02-11',
      '2018-02-12',
      '2018-02-13',
      '2018-02-14'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should parse next with larger days', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [3],
      measure: 'days'
    });
    const expected = [
      '2018-02-10',
      '2018-02-13',
      '2018-02-16',
      '2018-02-19',
      '2018-02-22'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should parse multiple days', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [3, 5],
      measure: 'days'
    });
    const expected = [
      '2018-02-10',
      '2018-02-13',
      '2018-02-15',
      '2018-02-16',
      '2018-02-19'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});

describe('getting next weeks', () => {
  it('should get next weeks', () => {
    const recur = new Everydate({
      start: '2018-09-30',
      units: [1],
      measure: 'weeks'
    });
    const expected = [
      '2018-09-30',
      '2018-10-07',
      '2018-10-14',
      '2018-10-21',
      '2018-10-28'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should get multiple next weeks', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [3, 5],
      measure: 'weeks'
    });
    const expected = [
      '2018-02-10',
      '2018-03-03',
      '2018-03-17',
      '2018-03-24',
      '2018-04-14'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});

describe('getting next months', () => {
  it('should get next months', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'months'
    });
    const expected = [
      '2018-02-10',
      '2018-04-10',
      '2018-06-10',
      '2018-08-10',
      '2018-10-10',
      '2018-12-10'
    ];
    expect(recur.next(6)).toEqual(expected);
  });

  it('should get multiple next months', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [2, 5],
      measure: 'months'
    });
    const expected = [
      '2018-02-10',
      '2018-04-10',
      '2018-06-10',
      '2018-07-10',
      '2018-08-10',
      '2018-10-10'
    ];
    expect(recur.next(6)).toEqual(expected);
  });
});

describe('getting next years', () => {
  it('should get next years', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [1],
      measure: 'years'
    });
    const expected = [
      '2018-02-10',
      '2019-02-10',
      '2020-02-10',
      '2021-02-10',
      '2022-02-10',
      '2023-02-10'
    ];
    expect(recur.next(6)).toEqual(expected);
  });

  it('should get multiple years', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [2, 5],
      measure: 'years'
    });
    const expected = [
      '2018-02-10',
      '2020-02-10',
      '2022-02-10',
      '2023-02-10',
      '2024-02-10',
      '2026-02-10'
    ];
    expect(recur.next(6)).toEqual(expected);
  });
});

describe('getting next daysOfWeek', () => {
  it('should get next daysOfWeek when start is > weekday', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'daysOfWeek'
    });
    const expected = [
      '2018-02-13',
      '2018-02-20',
      '2018-02-27',
      '2018-03-06',
      '2018-03-13'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
  it('should get next daysOfWeek when start is === weekday', () => {
    const recur = new Everydate({
      start: '2018-02-06',
      units: [2],
      measure: 'daysOfWeek'
    });
    const expected = [
      '2018-02-06',
      '2018-02-13',
      '2018-02-20',
      '2018-02-27',
      '2018-03-06'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
  it('should get next daysOfWeek when start is < weekday', () => {
    const recur = new Everydate({
      start: '2018-02-06',
      units: [6],
      measure: 'daysOfWeek'
    });
    const expected = [
      '2018-02-10',
      '2018-02-17',
      '2018-02-24',
      '2018-03-03',
      '2018-03-10'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
  it('should get multiple next daysOfWeek', () => {
    const recur = new Everydate({
      start: '2018-02-06',
      units: [3, 6],
      measure: 'daysOfWeek'
    });
    const expected = [
      '2018-02-07',
      '2018-02-10',
      '2018-02-14',
      '2018-02-17',
      '2018-02-21'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});

describe('getting next days of month', () => {
  it('should get next daysOfMonth when start < unit', () => {
    const recur = new Everydate({
      start: '2018-02-10',
      units: [15],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-02-15',
      '2018-03-15',
      '2018-04-15',
      '2018-05-15',
      '2018-06-15'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should get next daysOfMonth when start === unit', () => {
    const recur = new Everydate({
      start: '2018-02-15',
      units: [15],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-02-15',
      '2018-03-15',
      '2018-04-15',
      '2018-05-15',
      '2018-06-15'
    ];
    expect(recur.next(5)).toEqual(expected);
  });

  it('should get next daysOfMonth when start > unit', () => {
    const recur = new Everydate({
      start: '2018-02-18',
      units: [15],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-03-15',
      '2018-04-15',
      '2018-05-15',
      '2018-06-15',
      '2018-07-15'
    ];
    expect(recur.next(5)).toEqual(expected);
  });
});
