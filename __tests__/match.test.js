import everydate from '../src';

describe('matching days', () => {
  it('should return true for matching days', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [5],
      measure: 'days'
    });
    expect(recur.match('2018-02-15')).toEqual(true);
    expect(recur.match('2018-02-10')).toEqual(true);
  });
  it('should return false for non matching days', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [5],
      measure: 'days'
    });
    expect(recur.match('2018-02-16')).toEqual(false);
  });
});

describe('matching weeks', () => {
  it('should return true for matching weeks', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'weeks'
    });
    expect(recur.match('2018-02-24')).toEqual(true);
    expect(recur.match('2018-02-10')).toEqual(true);
  });
  it('should return false for non matching weeks', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'weeks'
    });
    expect(recur.match('2018-02-17')).toEqual(false);
  });
});

describe('matching months', () => {
  it('should return true for matching months', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'months'
    });
    expect(recur.match('2018-02-10')).toEqual(true);
    expect(recur.match('2018-04-10')).toEqual(true);
    expect(recur.match('2018-12-10')).toEqual(true);
  });
  it('should return false for non matching months', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'months'
    });
    expect(recur.match('2018-03-10')).toEqual(false);
    expect(recur.match('2018-04-11')).toEqual(false);
  });
});

describe('matching years', () => {
  it('should return true for matching years', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'years'
    });
    expect(recur.match('2018-02-10')).toEqual(true);
    expect(recur.match('2020-02-10')).toEqual(true);
    expect(recur.match('2022-02-10')).toEqual(true);
  });
  it('should return false for non matching years', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'years'
    });
    expect(recur.match('2020-02-11')).toEqual(false);
    expect(recur.match('2019-02-10')).toEqual(false);
  });
});

describe('matching daysOfWeek', () => {
  it('should return true for matching daysOfWeek', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'daysOfWeek'
    });
    expect(recur.match('2018-02-13')).toEqual(true);
    expect(recur.match('2018-11-13')).toEqual(true);
  });
  it('should return false for non matching daysOfWeek', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [2],
      measure: 'daysOfWeek'
    });
    expect(recur.match('2018-02-10')).toEqual(false);
    expect(recur.match('2018-02-06')).toEqual(false);
    expect(recur.match('2018-02-14')).toEqual(false);
  });
});

describe('matching daysOfMonth', () => {
  it('should return true for matching daysOfMonth', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [15],
      measure: 'daysOfMonth'
    });
    expect(recur.match('2018-02-15')).toEqual(true);
    expect(recur.match('2028-11-15')).toEqual(true);
  });
  it('should return false for non matching daysOfMonth', () => {
    const recur = everydate({
      start: '2018-02-10',
      units: [15],
      measure: 'daysOfMonth'
    });
    expect(recur.match('2018-02-10')).toEqual(false);
    expect(recur.match('2018-03-14')).toEqual(false);
  });
});

describe('matching options', () => {
  it('should not match if after end', () => {
    const recur = everydate({
      start: '2018-02-10',
      end: '2018-02-15',
      units: [1],
      measure: 'days'
    });
    expect(recur.match('2018-02-16')).toEqual(false);
  })
})