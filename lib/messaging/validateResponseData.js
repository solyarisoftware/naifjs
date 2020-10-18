const { isString } = require('./isString')
const { isObject } = require('./isObject')
const { error } = require('../devlog')
const { unixTime } = require('../time')

/**
 * validate response API data object  
 *
 * @param {String|ResponseDataObject} data
 *
 * examples:
 *
 *   validateResponseData('user utterance') 
 *   ->  { text: 'user utterance', speech: false }
 *
 *   validateResponseData({text: 'user utterance'}) 
 *   ->  { text: 'user utterance', speech: false }
 *   
 *   validateResponseData({text: 'user utterance' speech: 'user utternace'}) 
 *   ->  { text: 'user utterance', speech: true }
 *
 * @return {ResponseDataObject} valid response data object
 *
 */
function validateResponseData(data) {
  
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
        return { text: data.text, speech: false, time: unixTime()}
        
    }  
    else 
      error(`request data ${JSON.stringify(data)}. Missing "text" attribute`)
  }  

  // data is a string
  else if ( isString(data) ) {
    return { text: data, speech: false, time: unixTime()}
  }

  else {
    // data is not a valid object
    error(`request data ${JSON.stringify(data)} is an invalid object`)
  } 

  return null
}


/**
 * add 'wait' flag to the response data object  
 *
 * @param {ResponseDataObject}
 * @return {responseDataObject} valid response data object, with attribute wait
 *
 */
function addWaitFlag(data) {
  
  // data is an object
  if ( isObject(data) ) {
    // add wait attribute to the object
    data.wait = true
    return data
  }  

  // data is a string
  else if ( isString(data) ) {
    return { text: data, wait: true }
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

  //
  // validateResponseData NOT PASS
  //
  data = { speech: true }

  console.log(1, data)
  console.log( validateResponseData(data) )
  console.log()

  data = { alfa: 'alfa' } 

  console.log(2, data)
  console.log( validateResponseData(data) )
  console.log()

  //
  // validateResponseData PASS
  //
  data = 'this is an utterance'

  console.log(3, data)
  console.log( validateResponseData(data) )
  console.log()

  data = {text: 'this is a valid sentence'}

  console.log(4, data)
  console.log( validateResponseData(data) )
  console.log()

  data = {text: 'this is a valid sentence', speech: true}

  console.log(5, data)
  console.log( validateResponseData(data) )
  console.log()

  data = {text: 'this is a valid sentence', speech: true, caption: true, sentenceTokenize: false}

  console.log(6, data)
  console.log( validateResponseData(data) )
  console.log()

  //
  // addWaitFlag PASS
  //
  data = {text: 'this is a valid sentence', speech: true, caption: true, sentenceTokenize: false}
  console.log(7, data)
  console.log( addWaitFlag(data) )
  console.log()

  data = 'this is an utterance'
  console.log(8, data)
  console.log( addWaitFlag(data) )
  console.log()

}  


module.exports = { 
  addWaitFlag,
  validateResponseData 
}

