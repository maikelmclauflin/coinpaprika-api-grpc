const utils = require('utils')
module.exports = {
  coins,
}

function coins (test, io) {
  test('coins', async (t) => {
    const { body, } = await io.coins()
    const coins = utils.readDataFile('coins.json')
    t.deepEqual(coins, body, 'a snapshot of the currently available coins / tokens')
  })
}
