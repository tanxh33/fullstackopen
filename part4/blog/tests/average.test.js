const { average } = require('../utils/example_tests');

// "describe" block defined around tests that are given the name "average"
// Used to group tests into logical collections.
describe('average', () => {
  test('of one value is the value itself', () => {
    // No need to assign output result to another variable,
    // just put it into "expect()" immediately
    expect(average([1])).toBe(1);
  });

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('of empty array is zero', () => {
    expect(average([])).toBe(0);
  });
});
