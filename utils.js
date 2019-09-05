const fs = require('fs')
const path = require('path')
const { PORT } = require('env')
module.exports = {
  readDataFile,
  protosPath,
  binding,
}

function readDataFile (...structure) {
  const p = path.join(__dirname, 'data', ...structure)
  return JSON.parse(fs.readFileSync(p).toString())
}

function protosPath (version) {
  return path.join(__dirname, 'protos', version || 'v1', 'index.proto')
}

function binding () {
  return `localhost:${PORT}`
}
