import everydate from '../src';

describe('getting all days', () => {
  it('should get all days', () => {
    const recur = everydate({
      start: '2018-02-10',
      end: '2018-02-17',
      units: [1],
      measure: 'days'
    });
    const expected = [
      '2018-02-10',
      '2018-02-11',
      '2018-02-12',
      '2018-02-13',
      '2018-02-14',
      '2018-02-15',
      '2018-02-16',
      '2018-02-17'
    ];
    expect(recur.all()).toEqual(expected);
  });

  it('should get all days with multiple units', () => {
    const recur = everydate({
      start: '2018-02-10',
      end: '2018-02-17',
      units: [2, 3],
      measure: 'days'
    });
    const expected = [
      '2018-02-10',
      '2018-02-12',
      '2018-02-13',
      '2018-02-14',
      '2018-02-16'
    ];
    expect(recur.all()).toEqual(expected);
  });
});

describe('getting all weeks', () => {
  it('should get all weeks', () => {
    const recur = everydate({
      start: '2018-03-03',
      end: '2018-04-03',
      units: [1],
      measure: 'weeks'
    });
    const expected = [
      '2018-03-03',
      '2018-03-10',
      '2018-03-17',
      '2018-03-24',
      '2018-03-31'
    ];
    expect(recur.all()).toEqual(expected);
  });

  it('should get all weeks with multiple units', () => {
    const recur = everydate({
      start: '2018-03-03',
      end: '2018-05-03',
      units: [2, 3],
      measure: 'weeks'
    });
    const expected = [
      '2018-03-03',
      '2018-03-17',
      '2018-03-24',
      '2018-03-31',
      '2018-04-14',
      '2018-04-28'
    ];
    expect(recur.all()).toEqual(expected);
  });
});

describe('getting all months', () => {
  it('should get all months', () => {
    const recur = everydate({
      start: '2018-03-03',
      end: '2018-08-03',
      units: [1],
      measure: 'months'
    });
    const expected = [
      '2018-03-03',
      '2018-04-03',
      '2018-05-03',
      '2018-06-03',
      '2018-07-03',
      '2018-08-03'
    ];
    expect(recur.all()).toEqual(expected);
  });
});

describe('getting all years', () => {
  it('should get all years', () => {
    const recur = everydate({
      start: '2018-03-03',
      end: '2020-08-03',
      units: [1],
      measure: 'years'
    });
    const expected = ['2018-03-03', '2019-03-03', '2020-03-03'];
    expect(recur.all()).toEqual(expected);
  });
});

describe('getting all daysOfWeek', () => {
  it('should get all days of week when start === unit', () => {
    const recur = everydate({
      start: '2018-02-10',
      end: '2018-03-11',
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
    expect(recur.all()).toEqual(expected);
  });

  it('should get all days of week when start < unit', () => {
    const recur = everydate({
      start: '2018-02-07',
      end: '2018-03-11',
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
    expect(recur.all()).toEqual(expected);
  });

  it('should get all days of week when start > unit', () => {
    const recur = everydate({
      start: '2018-02-11',
      end: '2018-03-11',
      units: [6],
      measure: 'daysOfWeek'
    });
    const expected = ['2018-02-17', '2018-02-24', '2018-03-03', '2018-03-10'];
    expect(recur.all()).toEqual(expected);
  });
});

describe('getting all daysOfMonth', () => {
  it('should get all days of month when start === unit', () => {
    const recur = everydate({
      start: '2018-02-10',
      end: '2018-07-11',
      units: [10],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-02-10',
      '2018-03-10',
      '2018-04-10',
      '2018-05-10',
      '2018-06-10',
      '2018-07-10'
    ];
    expect(recur.all()).toEqual(expected);
  });

  it('should get all days of week when start < unit', () => {
    const recur = everydate({
      start: '2018-02-07',
      end: '2018-07-11',
      units: [10],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-02-10',
      '2018-03-10',
      '2018-04-10',
      '2018-05-10',
      '2018-06-10',
      '2018-07-10'
    ];
    expect(recur.all()).toEqual(expected);
  });

  it('should get all days of week when start > unit', () => {
    const recur = everydate({
      start: '2018-02-11',
      end: '2018-07-11',
      units: [10],
      measure: 'daysOfMonth'
    });
    const expected = [
      '2018-03-10',
      '2018-04-10',
      '2018-05-10',
      '2018-06-10',
      '2018-07-10'
    ];
    expect(recur.all()).toEqual(expected);
  });

  it('should only return start if no end is given', () => {
    const recur = everydate({
      start: '2018-02-11',
      units: [10],
      measure: 'daysOfMonth'
    });
    const expected = ['2018-02-11'];
    expect(recur.all()).toEqual(expected);
  });

  it('should return start and end if is not recurring', () => {
    const recur = everydate({
      start: '2018-02-11',
      end: '2018-02-15',
      measure: 'daysOfMonth'
    });
    const expected = ['2018-02-11', '2018-02-15'];
    expect(recur.all()).toEqual(expected);
  });

  it('should return all dates with from and to options', () => {
    const recur = everydate({
      start: '2018-06-01',
      end: '2019-06-01',
      measure: 'days',
      units: [1]
    });
    const expected = ['2018-07-01', '2018-07-02', '2018-07-03'];
    expect(recur.all({ from: '2018-07-01', to: '2018-07-03' })).toEqual(expected);
  });

  it('should return all dates, when to is set, but recur has no end', () => {
    const recur = everydate({
      start: '2018-06-01',
      measure: 'days',
      units: [1]
    });
    const expected = ['2018-07-01', '2018-07-02', '2018-07-03'];
    expect(recur.all({ from: '2018-07-01', to: '2018-07-03' })).toEqual(expected);
  });

  it('should cap at end if to > end', () => {
    const recur = everydate({
      start: '2018-06-01',
      end: '2018-06-05',
      measure: 'days',
      units: [1]
    });
    const expected = ['2018-06-03', '2018-06-04', '2018-06-05'];
    expect(recur.all({ from: '2018-06-03', to: '2018-07-03' })).toEqual(expected);
  });

  it('moves dates according to moves object', () => {
    const recur = everydate({
      start: '2018-06-01',
      end: '2018-06-05',
      measure: 'days',
      units: [2],
      moves: [
        { from: '2018-06-03', to: '2018-06-04' }
      ]
    });
    const expected = ['2018-06-01', '2018-06-04', '2018-06-05'];
    expect(recur.all()).toEqual(expected);
  });

  it('ignores moves where from is not in the result', () => {
    const recur = everydate({
      start: '2018-06-01',
      end: '2018-06-05',
      measure: 'days',
      units: [2],
      moves: [
        { from: '2018-06-02', to: '2018-06-04' }
      ]
    });
    const expected = ['2018-06-01', '2018-06-03', '2018-06-05'];
    expect(recur.all()).toEqual(expected);
  });

  it('does not duplicate dates when moves exist', () => {
    const recur = everydate({
      start: '2018-06-01',
      end: '2018-06-05',
      measure: 'days',
      units: [2],
      moves: [
        { from: '2018-06-03', to: '2018-06-05' }
      ]
    });
    const expected = ['2018-06-01', '2018-06-05'];
    expect(recur.all()).toEqual(expected);
  })
});
