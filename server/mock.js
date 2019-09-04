const _ = require('lodash')
const utils = require('../utils')

module.exports = {
  marketOverview,
  coins,
}

function marketOverview () {
  return utils.readDataFile('market-overview.json')
}

function coins () {
  return utils.readDataFile('coins.json')
}
