const { isString } = require('./isString')
const { isObject } = require('./isObject')
const { error } = require('../devlog')
const { unixTime } = require('../time')

/**
 * validate request API data object  
 *
 * @param {String} userid
 * @param {string|RequestDataObject} data
 *
 * examples:
 *
 *   validateRequestData('user utterance') i
 *   // ->  { text: 'user utterance', speech: false }
 *
 *   validateRequestData({text: 'user utterance'}) 
 *   // ->  { text: 'user utterance', speech: false }
 *   
 *   validateRequestData({text: 'user utterance' speech: 'user utternace'}) 
 *   //->  { text: 'user utterance', speech: true }
 *
 * @return {RequestDataObject} valid request data object
 *
 */
function validateRequestData(data) {
  

  // data is an object
  if ( isObject(data) ) {

    // text attribute is mandatory
    if (data.text) {

      // speech attribute is optional/calculated
      if (data.speech) {
        const timeAttr = { time: unixTime() }
        return { ...data, ...timeAttr }
      }  
      else
        return { text: data.text, speech: false, time: unixTime() }
    }  
    else 
      error(`request data ${JSON.stringify(data)}. Missing "text" attribute`)
  }  

  // data is a string
  else if ( isString(data) ) {
    return { text: data, speech: false, time: unixTime() }
  }

  else {
    // data is not a valid object
    error(`request data ${JSON.stringify(data)} is an invalid object`)
  } 

  return null
}


// test
if (require.main === module) {

  let data

  data = { speech: true }
  
  console.log(1, data)
  console.log( validateRequestData(data) )
  console.log()

  data =  { alfa: 'alfa' } 
  
  console.log(2, data)
  console.log( validateRequestData(data) )
  console.log()

  data = 'this is an utterance'
  
  console.log(3, data)
  console.log( validateRequestData(data) )
  console.log()

  data = {text: 'this is a valid sentence'}
  
  console.log(4, data)
  console.log( validateRequestData(data) )
  console.log()

  data = {text: 'this is a valid sentence', speech: true}
  
  console.log(5, data)
  console.log( validateRequestData(data) )
  console.log()
}  


module.exports = { validateRequestData }

