/**
 * Convert a string, that contains a float number, to integer with 4 decimals precision.
 *
 * @param {string} s
 */
function stringFloatToInteger(s) {
  const [int, dec] = s.split('.');
  const decimal = `${dec || ''}0000`.substr(0, 4);
  return Number.parseInt(`${int}${decimal}`, 10);
}

module.exports = {
  stringFloatToInteger
};
