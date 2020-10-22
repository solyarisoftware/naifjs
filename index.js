/**
 * index.js 
 * naifjs package entry point
 */ 

const sessionid = require('./lib/sessionid')
const timeouts = require('./lib/timeouts')
const engine = require('./lib/engine')
const response = require('./lib/response')
const request = require('./lib/request')
const variables = require('./lib/variables')
const patternsMatchRegexp = require('./lib/patternsMatchRegexp')
const banner = require('./bin/lib/info')
const buildTags = require('./lib/buildTags')
const logdialog = require('./lib/logdialog')

// https://stackoverflow.com/questions/39121695/merge-two-objects-with-es6
const allFunctions = {
  ...sessionid, 
  ...timeouts, 
  ...engine, 
  ...request, 
  ...response, 
  ...variables, 
  ...patternsMatchRegexp,
  ...banner,
  ...buildTags,
  logdialog
}

module.exports = allFunctions

// debug
if (require.main === module) {
  console.log(allFunctions)
}  

