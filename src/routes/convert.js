const Boom = require('boom');
const { convert } = require('../converters/currency');
const { stringFloatToInteger } = require('../converters/number');

module.exports = (fastify, opts, next) => {
  const options = {
    schema: {
      summary: 'Convert currency',
      description: 'Convert a currency to another, using the requested currency date',
      tags: ['converter'],
      querystring: {
        type: 'object',
        required: ['amount', 'src_currency', 'dest_currency', 'reference_date'],
        properties: {
          amount: {
            // Use string to keep decimal precision
            type: 'string',
            description: 'The amount to convert'
          },
          src_currency: {
            type: 'string',
            pattern: '^([A-Z]{3})$', // Allow only ISO code
            description: 'ISO currency code for the source currency to convert'
          },
          dest_currency: {
            type: 'string',
            pattern: '^([A-Z]{3})$', // Allow only ISO code
            description: 'ISO currency code for the destination currency to convert'
          },
          reference_date: {
            type: 'string',
            // Allow only YYYY-MM-DD date format
            pattern: '^((19|20)[0-9]{2})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$',
            description: 'Reference date for the exchange rate, in YYYY-MM-DD format'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['currency', 'amount'],
          properties: {
            amount: {
              type: 'number'
            },
            currency: {
              type: 'string'
            }
          }
        }
      }
    }
  };

  fastify.get('/convert', options, (request, reply) => {
    // Check if amount is a number
    if (Number.isNaN(Number.parseFloat(request.query.amount))) {
      return reply.send(Boom.badRequest('Amount must be a number'));
    }
    try {
      const db = fastify.currencyDatabase;
      const fromRatio = db.getRatio(
        request.query.reference_date,
        request.query.src_currency
      );
      const toRatio = db.getRatio(
        request.query.reference_date,
        request.query.dest_currency
      );

      const amount = stringFloatToInteger(request.query.amount);
      const converted = convert(amount, fromRatio, toRatio);

      return reply.send({
        amount: converted / 10000, // Return back to float
        currency: request.query.dest_currency
      });
    } catch (error) {
      return reply.send(Boom.badData(error));
    }
  });
  next();
};
