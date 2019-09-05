const utils = require('utils')
module.exports = {
  tags,
}

function tags (test, io) {
  test('tags', async (t) => {
    const { body, } = await io.tags()
    const tags = utils.readDataFile('tags.json')
    t.deepEqual(tags, body, 'tags containing information about tokens')
  })
}
