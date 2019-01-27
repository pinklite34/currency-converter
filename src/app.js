/* eslint global-require: 0 */
const Fastify = require('fastify');
const CurrencyDatabase = require('./database/currency-database');
const { parse } = require('./bce-client/xml-parser');

/**
 * Setup a Fastify instance with currency database
 *
 * @param {string} xml BCE XML
 */
function buildFastify(xml) {
  const data = parse(xml);
  const currencyDatabase = new CurrencyDatabase(data);
  const fastify = Fastify();
  fastify
    .register(require('fastify-cors'), { methods: ['GET'] })
    .register(require('fastify-boom'))
    .register(require('fastify-helmet')) // Some security
    .register(require('./routes/convert'))
    .decorate('currencyDatabase', currencyDatabase);

  return fastify;
}

module.exports = { buildFastify };
