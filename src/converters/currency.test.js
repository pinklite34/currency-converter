const { convert } = require('./currency');

describe('Converter', () => {
  test('should convert an amount between given 2 currency ratios', () => {
    const result = convert(5000, 8900, 12500);
    expect(result).toBe(7022);
  });

  test('should return an error if amount is negative', () => {
    expect(() => convert(-5000, 1, 1)).toThrow(new Error('Amount is negative'));
  });

  test('should always return 0 if given amount is 0', () => {
    const result = convert(0, 100, 1000);
    expect(result).toBe(0);
  });

  test('should always return a rounded integer result', () => {
    const result = convert(50000, 8900, 12500);
    expect(result).toBe(70225);
  });

  test('should return an error if ratios are 0 or negative', () => {
    expect(() => convert(10, 10, 0)).toThrow(new Error('Invalid ratio'));
    expect(() => convert(10, 0, 1000)).toThrow(new Error('Invalid ratio'));
  });
});
