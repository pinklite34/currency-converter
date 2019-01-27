/**
 * Convert amount from a currency to another, using their EUR conversion ratio
 *
 * @param {number} amount
 * @param {number} fromRatio
 * @param {number} toRatio
 */
function convert(amount, fromRatio, toRatio) {
  if (amount === 0) return 0;
  if (amount < 0) throw new Error('Amount is negative');
  if (fromRatio <= 0 || toRatio <= 0) throw new Error('Invalid ratio');

  return Math.round((amount / fromRatio) * toRatio);
}

module.exports = {
  convert
};
