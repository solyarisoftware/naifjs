const fs = require('fs')
const moment = require('moment') 
const COLOR = require('./color') 

//
// TODO 
// set locale: ITALY
// Why?
//
moment.locale('it')

let stream


function open(filename) {
  const APPEND_MODE = { flags:'a', encoding: 'utf8' }
  stream = fs.createWriteStream(filename, APPEND_MODE)
}


function request(id, userSentence) { 
  stream.write( `${moment().format('YY.MM.DD LTS')} ${id} > ${COLOR.YELLOW}${userSentence.replace(/\n/g, ' ')}${COLOR.RESET}\n`)
}


function response(id, botSentence) { 
  stream.write( `${moment().format('YY.MM.DD LTS')} ${id} < ${COLOR.GREEN_BOLD}${botSentence.replace(/\n/g, ' ')}${COLOR.RESET}\n`)
}



function data(id, text, data) { 
  
  const timestamp = moment()
  const readableTime = timestamp.format('YY.MM.DD LTS') 
  const unixTime = timestamp.unix()

  // add id and timestampt to the data structure
  if ( (typeof data === 'object') && (typeof data !== 'undefined')  ) {

    data.id = id
    data.time = unixTime

  }   

  const serializedData = JSON.stringify(data)
  const optionalText = (text)? text + ': ': ''

  //stream.write( `${readableTime} ${id} D ${COLOR.GREEN_BOLD}${optionalText}${serializedData}${COLOR.RESET}\n`)
  stream.write( `${readableTime} ${id} D ${optionalText}${serializedData}\n`)
}


function close() {
  stream.end()
}


/*
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
  
  open('./tmp/test.log')
  //open('/dev/stdout')

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
  data, 
  close 
} 

