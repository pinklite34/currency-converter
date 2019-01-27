/* eslint-disable no-console */
const { buildFastify } = require('./app');
const { getEuroReferenceRates } = require('./bce-client/client');

getEuroReferenceRates()
  .then((xml) => buildFastify(xml).listen(3000, '0.0.0.0')) // 0.0.0.0 is for Docker
  .then(() => console.log('App is running!'))
  .catch((error) => {
    console.log('Error setting up application', error);
  });
