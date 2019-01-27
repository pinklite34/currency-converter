const https = require('https');

const URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml';

/**
 * Get BCE Euro reference rates XML
 *
 * @returns {Promise<string>}
 */
function getEuroReferenceRates() {
  return new Promise((resolve, reject) =>
    https
      .get(URL, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (error) => {
        reject(error);
      })
  );
}

module.exports = { getEuroReferenceRates };
