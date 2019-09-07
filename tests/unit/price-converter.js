const utils = require('utils')
module.exports = {
  priceConverter,
}

function priceConverter (test, io) {
  test('price converter', async (t) => {
    const { body, } = await io.priceConverter({
      inputs: {
        base_currency_id: 'btc-bitcoin',
        quote_currency_id: 'cel-celsius',
        amount: 1,
      }
    })
    const priceConverter = utils.readDataFile('price-converter.json')
    t.deepEqual(priceConverter, body, 'a price conversion')
  })
}
