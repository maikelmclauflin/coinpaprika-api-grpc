const utils = require('utils')
module.exports = {
  coinEvents,
}

function coinEvents (test, io) {
  test('coin events', async (t) => {
    const { body, } = await io.coinEvents({
      coin: 'BTC',
    })
    const coin = utils.readDataFile('coin-event.json')
    t.deepEqual([coin, coin], body, 'a summary of the latest tweet of a coin')
  })
}
