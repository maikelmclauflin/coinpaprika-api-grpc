const test = require('ava')
const path = require('path')
const GRPC = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const startGrpcServer = require('../server')
const debug = require('log')
const utils = require('utils')
const protopath = utils.protosPath()
const packageDefinition = protoLoader.loadSync(protopath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const V1Package = new GRPC.loadPackageDefinition(packageDefinition) // eslint-disable-line
const grpcClient = new V1Package.v1.API(utils.binding(), GRPC.credentials.createInsecure())
test.before(startGrpcServer)
const stream = true
module.exports = {
  marketOverview: clientWrap('MarketOverview'),
  coins: clientWrap('Coins', { stream, }),
  coin: clientWrap('Coin'),
  coinTwitter: clientWrap('CoinTwitter', { stream, }),
  coinEvents: clientWrap('CoinEvents', { stream, }),
  exchangesGlobal: clientWrap('ExchangesGlobal', { stream, }),
  markets: clientWrap('Markets', { stream, }),
  ohlc: clientWrap('OHLC', { stream, }),
  person: clientWrap('Person'),
  tags: clientWrap('Tags', { stream, }),
  tickers: clientWrap('Tickers', { stream, }),
  historicalTickers: clientWrap('HistoricalTickers', { stream, }),
  exchanges: clientWrap('Exchanges', { stream, }),
}

function call (transfer, transform) {
  return async (options = {}) => {
    const {
      inputs = {},
      expect = 200
    } = options
    const res = {
      status: 200,
      text: '',
      body: ''
    }
    let err = null
    try {
      res.body = await transfer(inputs)
      res.text = res.body
    } catch (e) {
      err = e
    }
    if (err && expect === 200) {
      throw new Error(`expected ${expect}: ${err.message} ${err.stack}`)
    } else if (!err && expect !== 200) {
      throw new Error(`expected ${expect}`)
    }
    return res
  }
}

function clientWrap (key, opts = {}) {
  const {
    stream
  } = opts
  return call((arg) => new Promise((resolve, reject) => {
    if (!grpcClient[key]) {
      reject(new Error(`unable to call: ${key}`))
    }
    const call = grpcClient[key](arg, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
    if (!stream) {
      return
    }
    const result = []
    // treat stream like unary
    call.on('data', (data) => result.push(data))
    call.on('error', (err) => {
      debug(`error: ${key}`, arg)
      reject(err)
    })
    call.on('end', () => resolve(result))
  }))
}
