const { parse } = require('./xml-parser');

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

describe('XML Parser', () => {
  test('should parse a BCE reference rates XML into data map', () => {
    expect(parse(xml)).toMatchInlineSnapshot(`
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
  });

  test('should return an error if XML is invalid', () => {
    expect(() => parse('<Fake XML>')).toThrow(new Error('Invalid XML'));
  });
});
