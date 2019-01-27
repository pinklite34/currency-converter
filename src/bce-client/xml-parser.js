const parser = require('fast-xml-parser');
const { stringFloatToInteger } = require('../converters/number');

/**
 * Parse BCE XML into Map data structure
 *
 * @param {string} xml
 * @returns {Map<string, Map<string, number>>}
 */
function parse(xml) {
  const options = {
    attributeNamePrefix: '',
    attrNodeName: 'attr',
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    parseTrueNumberOnly: false
  };

  // Basic XML validation
  if (parser.validate(xml, options) !== true) throw new Error('Invalid XML');

  const obj = parser.getTraversalObj(xml, options);

  const items = obj.child['gesmes:Envelope'][0].child.Cube[0].child.Cube;
  const data = new Map();
  items.forEach((item) => {
    const date = item.attrsMap.attr.time;
    const currencies = new Map();
    item.child.Cube.forEach((c) => {
      const { currency, rate } = c.attrsMap.attr;
      currencies.set(currency, stringFloatToInteger(rate));
    });
    data.set(date, currencies);
  });

  return data;
}

module.exports = {
  parse
};
