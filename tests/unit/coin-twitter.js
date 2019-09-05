const utils = require('utils')
module.exports = {
  coinTwitter,
}

function coinTwitter (test, io) {
  test('coin twitter', async (t) => {
    const { body, } = await io.coinTwitter({
      inputs: {
        coin: 'BTC',
      }
    })
    const tweet = utils.readDataFile('coin-twitter.json')
    t.deepEqual([tweet], body, 'a summary of the latest tweet of a coin')
  })
}
