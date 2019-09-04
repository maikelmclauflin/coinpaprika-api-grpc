const ava = require('ava')
const _ = require('lodash')
const tests = require('tests/unit')
const env = require('env')

module.exports = generate

function generate(key, io) {
  const t = (msg, ...args) => ava(`${key}: ${msg}`, ...args)
  const test = _.assign(t, ava)
  return _.mapValues(tests, (fn) => fn.bind(this, test, io, env))
}
