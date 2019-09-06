const utils = require('utils')
const _ = require('lodash')
module.exports = {
  tickers,
}

function tickers (test, io) {
  test('tickers', async (t) => {
    const { body: allTickers, } = await io.tickers()
    const tickers = utils.readDataFile('tickers-default.json')
    t.deepEqual(tickers, allTickers, 'tickers containing information about coins')
    const { body: tickersQuotedBTC, } = await io.tickers({
      inputs: {
        quotes: ['BTC']
      }
    })
    const tickersBTC = utils.readDataFile('tickers-quotes-btc.json')
    t.deepEqual(tickersBTC, tickersQuotedBTC, 'tickers should transfer quotes relative to what is asked for')
    const key = 'eth-ethereum'
    const { body: ETHTickersQuotedUSD, } = await io.tickers({
      inputs: {
        coins: [key],
        quotes: ['USD']
      }
    })
    const filtered = _.filter(tickers, ({ id }) => {
      return id == key
    })
    t.deepEqual(filtered, ETHTickersQuotedUSD, 'tickers should transfer quotes relative to what is asked for')
  })
}
