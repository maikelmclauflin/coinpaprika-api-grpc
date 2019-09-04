const utils = require('utils')
module.exports = {
  coinTwitter,
}

function coinTwitter (test, io) {
  test('coin twitter', async (t) => {
    const { body, } = await io.coinTwitter({
      coin: 'BTC',
    })
    const coin = utils.readDataFile('coin-twitter.json')
    t.deepEqual(coin, body, 'a summary of the latest tweet of a coin')
  })
}
