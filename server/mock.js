const _ = require('lodash')
const utils = require('../utils')

module.exports = {
  marketOverview,
  coins,
  coin,
  coinTwitter,
  coinEvents,
  exchanges,
  markets,
  ohlc,
  person,
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

function exchanges () {
  return [utils.readDataFile('exchange.json')]
}

function markets () {
  return utils.readDataFile('markets.json')
}

function ohlc ({
  coin,
  modifier,
}) {
  return utils.readDataFile(`ohlc-${modifier}.json`)
}

function person () {
  return utils.readDataFile('person.json')
}
