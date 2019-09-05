const utils = require('utils')
module.exports = {
  ohlc,
}

function ohlc (test, io) {
  test('ohlc', async (t) => {
    await checkOHLC('latest')

    async function checkOHLC (modifier) {
      const { body, } = await io.ohlc({
        inputs: {
          coin: 'btc-bitcoin',
          modifier,
        }
      })
      const ohlc = utils.readDataFile(`ohlc-${modifier}.json`)
      t.deepEqual(ohlc, body, `a snapshot of the currently available ohlc ${modifier}`)
    }
  })
}
