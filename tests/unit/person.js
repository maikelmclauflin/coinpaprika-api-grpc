const utils = require('utils')
module.exports = {
  person,
}

function person (test, io) {
  test('person', async (t) => {
    const { body, } = await io.person({
      inputs: {
        id: 'vitalik-buterin',
      }
    })
    const person = utils.readDataFile('person.json')
    t.deepEqual(person, body, 'detailed information about a person in the cryptosphere')
  })
}
