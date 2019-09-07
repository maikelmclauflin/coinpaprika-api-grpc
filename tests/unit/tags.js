const utils = require('utils')
const _ = require('lodash')
module.exports = {
  tags,
}

function tags (test, io) {
  test('tags', async (t) => {
    const { body, } = await io.tags()
    const tags = utils.readDataFile('tags.json')
    t.deepEqual(tags, body, 'tags containing information about tokens')

    const id = 'blockchain-service'
    const { body: filteredTags, } = await io.tags({
      inputs: {
        id,
      }
    })
    const found = _.filter(tags, { id, })
    t.deepEqual(found, filteredTags, 'tag containing information about tokens')
  })
}
