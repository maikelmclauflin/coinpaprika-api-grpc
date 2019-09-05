const utils = require('utils')
const _ = require('lodash')
module.exports = {
  tag,
}

function tag (test, io) {
  test('tag', async (t) => {
    const id = 'blockchain-service'
    const { body, } = await io.tag({
      inputs: {
        id,
      }
    })
    const tag = utils.readDataFile('tags.json')
    t.deepEqual(_.find(tag, { id, }), body, 'tag containing information about tokens')
  })
}
