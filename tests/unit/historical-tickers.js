const utils = require('utils')
const _ = require('lodash')
module.exports = {
  historicalTickers,
}

function historicalTickers (test, io) {
  test('historical tickers', async (t) => {
    const { body, } = await io.historicalTickers()
    const tickers = utils.readDataFile('historical-tickers.json')
    t.deepEqual(tickers, body, 'tickers containing historical information about coins')
  })
}
