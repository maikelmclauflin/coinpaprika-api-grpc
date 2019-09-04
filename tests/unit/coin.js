const utils = require('utils')
module.exports = {
  coin,
}

function coin (test, io) {
  test('coin', async (t) => {
    const { body, } = await io.coin({
      coin: 'BTC',
    })
    const coin = utils.readDataFile('coin-detail.json')
    t.deepEqual(coin, body, 'a detailed snapshot of the coin')
  })
}
