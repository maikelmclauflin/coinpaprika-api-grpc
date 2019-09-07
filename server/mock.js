const _ = require('lodash')
const utils = require('../utils')

module.exports = {
  marketOverview,
  coins,
  coin,
  coinTwitter,
  coinEvents,
  exchangesGlobal,
  markets,
  ohlc,
  person,
  tags,
  tickers,
  historicalTickers,
  exchanges,
  search,
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

function exchangesGlobal () {
  return [utils.readDataFile('exchanges-global.json')]
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

function tags ({
  id,
}) {
  const tags = utils.readDataFile('tags.json')
  return id ? _.filter(tags, {
    id,
  }) : tags
}

function tickers ({
  coins,
  quotes,
}) {
  const tickers = utils.readDataFile('tickers-default.json')
  if (coins && coins.length) {
    return _.filter(tickers, ({ id }) => {
      return coins.includes(id)
    })
  }
  if (quotes && quotes.length) {
    return utils.readDataFile('tickers-quotes-btc.json')
  }
  return tickers
}

function historicalTickers ({
  start,
  end,
  limit,
  quote,
  interval,
}) {
  return utils.readDataFile('historical-tickers.json')
}

function exchanges () {
  return utils.readDataFile('exchanges.json')
}

function search () {
  return utils.readDataFile('search-btc.json')
}
