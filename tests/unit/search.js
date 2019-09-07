const utils = require('utils')
module.exports = {
  search,
}

function search (test, io) {
  test('search', async (t) => {
    const { body: bodyBTC, } = await io.search({
      inputs: {
        q: 'btc',
      }
    })
    const searchBTC = utils.readDataFile('search-btc.json')
    t.deepEqual(searchBTC, bodyBTC, 'detailed information about a search')
  })
}
