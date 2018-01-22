import Everydate from '../src';

describe('getting next dates', () => {
  it('should parse next with days', () => {
    const recur = new Everydate({
      start: new Date("2018-02-10"),
      units: [1],
      rule: 'days'
    });
    const expected = [
      new Date("2018-02-11"),
      new Date("2018-02-12"),
      new Date("2018-02-13"),
      new Date("2018-02-14"),
      new Date("2018-02-15")
    ]
    expect(recur.next(5)).toEqual(expected)
  })

  it('should parse next with larger days', () => {
    const recur = new Everydate({
      start: new Date("2018-02-10"),
      units: [3],
      rule: 'days'
    });
    const expected = [
      new Date("2018-02-13"),
      new Date("2018-02-16"),
      new Date("2018-02-19"),
      new Date("2018-02-22"),
      new Date("2018-02-25")
    ]
    expect(recur.next(5)).toEqual(expected)
  })
})