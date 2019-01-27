/* eslint max-len: 0 */
const { buildFastify } = require('../app');

describe('Currency Converter app', () => {
  const xml = `<gesmes:Envelope 
      xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" 
      xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
      <gesmes:subject>Reference rates</gesmes:subject>
        <gesmes:Sender>
        <gesmes:name>European Central Bank</gesmes:name>
      </gesmes:Sender>
      <Cube>
        <Cube time="2019-01-25">
          <Cube currency="USD" rate="1.1346"/>
          <Cube currency="JPY" rate="124.72"/>
          <Cube currency="BGN" rate="1.9558"/>
          <Cube currency="CZK" rate="25.697"/>
        </Cube>
        <Cube time="2019-01-24">
          <Cube currency="USD" rate="1.1341"/>
          <Cube currency="JPY" rate="124.43"/>
          <Cube currency="BGN" rate="1.9558"/>
          <Cube currency="CZK" rate="25.695"/>
    </Cube>
      </Cube>
      </gesmes:Envelope>`;

  test('should convert an amount from source currency to destination currency, given a date', () => {
    expect.assertions(2);

    const fastify = buildFastify(xml);
    return fastify
      .inject({
        method: 'GET',
        url:
          '/convert?amount=1.0&src_currency=EUR&dest_currency=USD&reference_date=2019-01-25'
      })
      .then((response) => {
        expect(response.payload).toEqual('{"amount":1.1346,"currency":"USD"}');
        expect(response.statusCode).toBe(200);
        return Promise.resolve();
      });
  });

  test('should require ISO currency format', () => {
    expect.assertions(4);

    const fastify = buildFastify(xml);
    return fastify
      .inject({
        method: 'GET',
        url:
          '/convert?amount=1.0&src_currency=eur&dest_currency=USD&reference_date=2019-01-25'
      })
      .then((response) => {
        expect(response.payload).toEqual(
          '{"statusCode":400,"error":"Bad Request","message":"querystring.src_currency should match pattern \\"^([A-Z]{3})$\\""}'
        );
        expect(response.statusCode).toBe(400);
        return Promise.resolve();
      })
      .then(() =>
        fastify.inject({
          method: 'GET',
          url:
            '/convert?amount=1.0&src_currency=EUR&dest_currency=dollar&reference_date=2019-01-25'
        })
      )
      .then((response) => {
        expect(response.payload).toEqual(
          '{"statusCode":400,"error":"Bad Request","message":"querystring.dest_currency should match pattern \\"^([A-Z]{3})$\\""}'
        );
        expect(response.statusCode).toBe(400);
        return Promise.resolve();
      });
  });

  test('should require YYYY-MM-DD date format', () => {
    expect.assertions(2);

    const fastify = buildFastify(xml);
    return fastify
      .inject({
        method: 'GET',
        url:
          '/convert?amount=1.0&src_currency=EUR&dest_currency=USD&reference_date=2019_01_25'
      })
      .then((response) => {
        expect(response.payload).toEqual(
          '{"statusCode":400,"error":"Bad Request","message":"querystring.reference_date should match pattern \\"^((19|20)[0-9]{2})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$\\""}'
        );
        expect(response.statusCode).toBe(400);
        return Promise.resolve();
      });
  });

  test('should setup with a BCE reference rates XML', () => {
    expect.assertions(2);

    const fastify = buildFastify(xml);
    return fastify.ready().then(() => {
      // @ts-ignore because currencyDatabase should exist
      expect(fastify.currencyDatabase).toBeDefined();
      // @ts-ignore
      expect(fastify.currencyDatabase.data).toMatchInlineSnapshot(`
Map {
  "2019-01-25" => Map {
    "USD" => 11346,
    "JPY" => 1247200,
    "BGN" => 19558,
    "CZK" => 256970,
  },
  "2019-01-24" => Map {
    "USD" => 11341,
    "JPY" => 1244300,
    "BGN" => 19558,
    "CZK" => 256950,
  },
}
`);
      return Promise.resolve();
    });
  });
});
