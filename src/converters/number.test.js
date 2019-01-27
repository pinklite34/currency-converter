const { stringFloatToInteger } = require('./number');

describe('Number converter', () => {
  test('should parse string float number into integer with 4 decimals', () => {
    expect(stringFloatToInteger('34.98')).toBe(349800);
    expect(stringFloatToInteger('34.983876')).toBe(349838);
    expect(stringFloatToInteger('34')).toBe(340000);
  });
});
