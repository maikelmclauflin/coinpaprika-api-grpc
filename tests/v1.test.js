import tests from './abstracted'
import client from '../client'

const grpcTests = tests('grpc', client)
grpcTests.marketOverview()
grpcTests.coins()
grpcTests.coin()
grpcTests.coinTwitter()
grpcTests.coinEvents()
grpcTests.exchangesGlobal()
grpcTests.exchanges()
grpcTests.markets()
grpcTests.ohlc()
grpcTests.person()
grpcTests.tags()
grpcTests.tickers()
grpcTests.historicalTickers()
grpcTests.search()
grpcTests.priceConverter()
