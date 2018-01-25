import everydate from '../src';

describe('getters', () => {
  const recur = everydate({
    start: '2018-02-10',
    end: '2018-02-20',
    units: [1],
    measure: 'days'
  });

  it('should get start', () => {
    expect(recur.getStart()).toEqual('2018-02-10');
  })

  it('should get end', () => {
    expect(recur.getEnd()).toEqual('2018-02-20');
  })

  it('should get units', () => {
    expect(recur.getUnits()).toEqual([1]);
  })

  it('should get days', () => {
    expect(recur.getMeasure()).toEqual('days');
  })
})