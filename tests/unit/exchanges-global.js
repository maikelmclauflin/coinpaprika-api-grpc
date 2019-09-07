const utils = require('utils')
module.exports = {
  exchangesGlobal,
}

function exchangesGlobal (test, io) {
  test('exchanges global', async (t) => {
    const { body, } = await io.exchangesGlobal({
      inputs: {
        coin: 'BTC',
      }
    })
    const exchanges = utils.readDataFile('exchanges-global.json')
    t.deepEqual([exchanges], body, 'a detailed snapshot of the exchanges')
  })
}
