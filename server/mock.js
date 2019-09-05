const _ = require('lodash')
const utils = require('../utils')

module.exports = {
  marketOverview,
  coins,
  coin,
  coinTwitter,
  coinEvents,
}

function marketOverview () {
  return utils.readDataFile('market-overview.json')
}

function coins () {
  return utils.readDataFile('coins.json')
}

function coin () {
  return utils.readDataFile('coin-detail.json')
}

function coinTwitter () {
  return [utils.readDataFile('coin-twitter.json')]
}

function coinEvents () {
  const event = utils.readDataFile('coin-event.json')
  return [event, event]
}
