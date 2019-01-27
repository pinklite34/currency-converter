const CurrencyDatabase = require('./currency-database');

describe('Currency database', () => {
  test('should return a conversion ratio, given a date and a currency', () => {
    const data = new Map([
      ['2018-08-22', new Map([['GBP', 8900], ['USD', 12500]])],
      ['2018-08-23', new Map([['GBP', 8700], ['USD', 12800]])]
    ]);
    const database = new CurrencyDatabase(data);

    expect(database.getRatio('2018-08-22', 'GBP')).toBe(8900);
    expect(database.getRatio('2018-08-23', 'USD')).toBe(12800);
  });

  test('should always return 10000 as EUR ratio', () => {
    const data = new Map();
    const database = new CurrencyDatabase(data);

    expect(database.getRatio('2018-08-22', 'EUR')).toBe(10000);
  });

  test('should return an error if a currency does not exist ', () => {
    const data = new Map([
      ['2018-08-22', new Map([['GBP', 8900], ['USD', 12500]])],
      ['2018-08-23', new Map([['GBP', 8700], ['USD', 12800]])]
    ]);
    const database = new CurrencyDatabase(data);

    expect(() => database.getRatio('2018-08-22', 'CHF')).toThrow(
      new Error('Currency does not exist')
    );
  });

  test('should return an error if a date does not exist ', () => {
    const data = new Map([
      ['2018-08-22', new Map([['GBP', 8900], ['USD', 12500]])],
      ['2018-08-23', new Map([['GBP', 8700], ['USD', 12800]])]
    ]);
    const database = new CurrencyDatabase(data);

    expect(() => database.getRatio('2018-09-22', 'GBP')).toThrow(
      new Error('Date does not exist')
    );
  });
});
