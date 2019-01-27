class CurrencyDatabase {
  /**
   * @param {Map<string, Map<string, number>>} data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Get a currency conveersion ratio from database, given a date
   *
   * @param {string} date
   * @param {string} currency
   * @returns {number}
   */
  getRatio(date, currency) {
    if (currency === 'EUR') return 10000;

    const day = this.data.get(date);
    if (!day) throw new Error('Date does not exist');

    const ratio = day.get(currency);
    if (!ratio) throw new Error('Currency does not exist');

    return ratio;
  }
}

module.exports = CurrencyDatabase;
