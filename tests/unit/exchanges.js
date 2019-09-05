const utils = require('utils')
module.exports = {
  exchanges,
}

function exchanges (test, io) {
  test('exchanges', async (t) => {
    const { body, } = await io.exchanges({
      coin: 'BTC',
    })
    const exchanges = utils.readDataFile('exchange.json')
    t.deepEqual([exchanges], body, 'a detailed snapshot of the exchanges')
  })
}
