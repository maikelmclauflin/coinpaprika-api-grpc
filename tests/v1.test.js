import tests from './abstracted'
import client from '../client'

const grpcTests = tests('grpc', client)
grpcTests.marketOverview()
grpcTests.coins()
