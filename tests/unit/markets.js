const utils = require('utils')
module.exports = {
  markets,
}

function markets (test, io) {
  test('markets', async (t) => {
    const { body, } = await io.markets({
      inputs: {
        coin: 'btc-bitcoin',
      }
    })
    const markets = utils.readDataFile('markets.json')
    t.deepEqual(markets, body, 'a snapshot of the currently available markets for a given coin')
  })
}
