import everydate from '../src';

describe('setters', () => {
  let recur;
  beforeEach(() => {
    recur = everydate({
      start: '2018-02-10',
      end: '2018-02-17',
      units: [1],
      measure: 'days'
    });
  })

  it('should set start', () => {
    const expected = [
      '2018-02-12',
      '2018-02-13',
      '2018-02-14'
    ]
    recur.setStart('2018-02-12')
    expect(recur.getStart()).toEqual('2018-02-12');
    expect(recur.next(3)).toEqual(expected)
  })

  it('should set end', () => {
    const expected = [
      '2018-02-10',
      '2018-02-11',
      '2018-02-12',
      '2018-02-13'
    ]
    recur.setEnd('2018-02-13')
    expect(recur.getEnd()).toEqual('2018-02-13');
    expect(recur.all()).toEqual(expected)
  })

  it('should set units', () => {
    const expected = [
      '2018-02-10',
      '2018-02-12',
      '2018-02-14',
      '2018-02-16'
    ]
    recur.setUnits([2])
    expect(recur.getUnits()).toEqual([2]);
    expect(recur.all()).toEqual(expected)
  })

  it('should set start', () => {
    const expected = [
      '2018-02-10',
      '2018-02-17'
    ]
    recur.setMeasure('weeks')
    expect(recur.getMeasure()).toEqual('weeks');
    expect(recur.all()).toEqual(expected)
  })
})