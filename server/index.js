const path = require('path')
const grpc = require('grpc')
const _ = require('lodash')
const utils = require('../utils')
const mock = require('./mock')
const {
  GRPC_ENABLED,
  API_KEY,
} = require('../env')
const protoLoader = require('@grpc/proto-loader')
const v1FilePath = utils.protosPath()
const options = {
  keepCase: true,
  longs: String,
  enums: Array,
  defaults: true,
  oneofs: true
}
module.exports = start

async function start () {
  if (!GRPC_ENABLED) {
    return
  }
  const v1Definition = protoLoader.loadSync(v1FilePath, options)
  const v1Package = grpc.loadPackageDefinition(v1Definition)
  const server = new grpc.Server()
  server.addService(v1Package.v1.API.service, {
    MarketOverview: urnary(mock.marketOverview),
    Coins: stream(mock.coins),
    Coin: urnary(mock.coin),
    CoinTwitter: stream(mock.coinTwitter),
    CoinEvents: stream(mock.coinEvents),
    ExchangesGlobal: stream(mock.exchangesGlobal),
    Markets: stream(mock.markets),
    OHLC: stream(mock.ohlc),
    Person: urnary(mock.person),
    Tags: stream(mock.tags),
    Tag: urnary(mock.tag),
    Tickers: stream(mock.tickers),
    HistoricalTickers: stream(mock.historicalTickers),
    Exchanges: stream(mock.exchanges),
    Search: urnary(mock.search),
  })
  const insecure = grpc.ServerCredentials.createInsecure()
  server.bind(utils.binding(), insecure)
  server.start()
  return server
}

function stream (...fns) {
  return async function (stream) {
    try {
      const result = await runList(stream.request, fns)
      result.forEach((item) => stream.write(item))
    } catch (err) {
      const {
        code = 500,
        message,
        status = grpc.status.UNKNOWN,
      } = err
      stream.emit('error', {
        code,
        message,
        status
      })
    }
    stream.end()
  }
}

async function runList (memo, fns) {
  let result = memo
  for (let i = 0; i < fns.length; i++) {
    result = await fns[i](result)
    if (!result && !_.isString(result)) {
      throw Object.assign(new Error('not found'), {
        code: 404,
        status: grpc.status.NOT_FOUND
      })
    }
  }
  return result
}

function urnary (...fns) {
  return async function (call, callback) {
    try {
      const payload = await runList(call.request, fns)
      callback(null, payload)
    } catch (e) {
      callback({
        error: e.message
      }, null)
    }
  }
}
