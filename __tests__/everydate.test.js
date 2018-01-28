import everydate from '../src';

describe('Input types and options', () => {
  it('should parse start as date', () => {
    const recur = everydate({
      start: new Date('2018-02-10'),
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

  it('should parse end as date', () => {
    const recur = everydate({
      start: new Date('2018-02-10'),
      end: new Date('2018-02-17'),
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

  it('should return date types when returnDates is true', () => {
    const recur = everydate({
      start: new Date('2018-02-10'),
      end: new Date('2018-02-16'),
      units: [1],
      measure: 'days',
      returnDates: true
    });

    const expectedNext = [
      new Date('2018-02-10'),
      new Date('2018-02-11'),
      new Date('2018-02-12'),
      new Date('2018-02-13'),
      new Date('2018-02-14')
    ];

    const expectedAll = [
      new Date('2018-02-10'),
      new Date('2018-02-11'),
      new Date('2018-02-12'),
      new Date('2018-02-13'),
      new Date('2018-02-14'),
      new Date('2018-02-15'),
      new Date('2018-02-16')
    ];

    expect(recur.next(5)).toEqual(expectedNext);
    expect(recur.all()).toEqual(expectedAll);
  });
});
