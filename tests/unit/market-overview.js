const utils = require('utils')
module.exports = {
  marketOverview,
}

function marketOverview (test, io) {
  test('market overview', async (t) => {
    const { body, } = await io.marketOverview()
    const marketOverview = utils.readDataFile('market-overview.json')
    t.deepEqual(marketOverview, body, 'a snapshot of market overview should be returned')
  })
}
