/**
 * @module log.js
 *
 * dialog (turn-taking) log in a simple format:
 *
 * +----------------------------------- timestamp 
 * |                 +----------------- session id
 * |                 |      +---------- request
 * |                 |      | +-------- text
 * v                 v      v v
 * 20.10.20 12.24.44 109562 > How are you?
 *
 *                          +---------- response
 *                          v  
 * 20.10.20 12.24.44 109562 < I'm fine
 * 20.10.20 12.24.44 109562 < thank you!
 *                          
 */ 

const fs = require('fs')
const moment = require('moment') 
const COLOR = require('./color') 

const DEFAULT_CONFIG = {

  // timestamp format in moment package parlance
  // https://flaviocopes.com/momentjs/
  timestampFormat: 'YY.MM.DD HH.mm.ss',
  
  substituteNewline: false,
  
  color: {
    request: COLOR.YELLOW,
    response: COLOR.GREEN_BOLD
  }  
}  

let stream
let config


/**
 * timestamp, in a format for moment library 
 *
 * @private
 * @param {string} momentFormat
 * @return {string}
 *
 */ 
function timestamp( momentFormat ) {
  return moment().format( momentFormat )
}  


/**
 * open log file, with a specified configuration
 *
 * @public
 * @param {String} filename
 * @param {Object} configModifiers
 *
 */ 
function open( filename, configModifiers ) {

  config = {...DEFAULT_CONFIG, ...configModifiers}

  const appendmode = { flags:'a', encoding: 'utf8' }

  stream = fs.createWriteStream(filename, appendmode)
}


/**
 * log a request
 *
 * @public
 * @param {string} sessionId
 * @param {string} sentence
 *
 */ 
function request(sessionId, sentence) { 

  const text = config.substituteNewline ? sentence.replace(/\n/g, ' ') : sentence

  if ( !config.color )
    stream.write( `${timestamp(config.timestampFormat)} ${sessionId} > ${text}\n`)
  else
    stream.write( `${timestamp(config.timestampFormat)} ${sessionId} > ${config.color.request}${text}${COLOR.RESET}\n`)

}


/**
 * log a response
 *
 * @public
 * @param {string} sessionId
 * @param {string} sentence
 *
 */ 
function response(sessionId, sentence) { 

  const text = config.substituteNewline ? sentence.replace(/\n/g, ' ') : sentence

  if ( !config.color )
    stream.write( `${timestamp(config.timestampFormat)} ${sessionId} < ${text}\n`)
  else
    stream.write( `${timestamp(config.timestampFormat)} ${sessionId} < ${config.color.response}${text}${COLOR.RESET}\n`)

}


function close() {
  stream.end()
}


/**
 * for unit test
 * @private
 */
function main() {

  /*
   * http://momentjs.com/
   * http://momentjs.com/docs/
   * https://stackabuse.com/writing-to-files-in-node-js/
   * https://stackoverflow.com/a/43370201/1786393 
   */

  // from unix (telegram) timestamp
  // console.log(moment().format('YY.MM.DD LTS'))
  //console.log(moment(1545945680 * 1000).format('YY.MM.DD LTS'))
  
  //open('./tmp/test.log')
  open( '/dev/stdout' )
  //open( '/dev/stdout', {color: false} )

  request('109562', 'How are you?')
  response('109562', 'I\'m fine, thank you!')

  close()

}

if (require.main === module) 
  main()

module.exports = { 
  open, 
  request, 
  response, 
  close 
} 

