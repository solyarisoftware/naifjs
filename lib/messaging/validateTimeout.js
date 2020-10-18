const { isObject } = require('./isObject')
const { isFunction } = require('./isFunction')
const { getDefaultTimeoutTime } = require('../timeouts')
const { error } = require('../devlog')

/**
 * validate timeout object  
 *
 * @param {function} callback  function pointer
 *
 * valid example
 *   validateTimeout(functionpointer) 
 *   ->  { callback: functionpointer, msecs: getDefaultTimeoutTime() }
 *
 * or
 *
 * @param {TimeoutObject} timeout
 * @param {function} TimeoutObject.callback  function pointer
 * @param {number} TimeoutObject.milliseconds number of timeout milliseconds 
 * @param {ParamsObject} TimeoutObject.params object with custom attributes
 *
 * valid examples:
 *   
 *   validateTimeout({callback: aFunctionpointer}) 
 *   ->  { callback: aFunctionpointer, milliseconds: getDefaultTimeoutTime() }
 *
 * @return {Object} valid timeout object 
 *
 */
function validateTimeout(timeout) {
  
  // timeout is a function
  if ( isFunction(timeout) ) {
    return { callback: timeout, milliseconds: getDefaultTimeoutTime() }
  }

  // timeout is an object
  else if ( isObject(timeout) ) {

    // callback (timeout function handler) is a mandatory attribute
    if (timeout.callback) {

      // speech attribute is optional/calculated
      if (timeout.milliseconds) 
        return timeout 
      else
        return { callback: timeout.callback, milliseconds: getDefaultTimeoutTime() }
        
    }  
    else 
      error(`timeout object ${JSON.stringify(timeout)}. Missing 'callback' attribute`)
  }  

  else {
    // timeout is not a valid object
    error(`timeout object ${JSON.stringify(timeout)} is invalid`)
  } 

  return null
}

//
// test
//
function testFunction() {
  console.log('testFunction')
}


if (require.main === module) {

  let timeoutObj 

  // 
  // MUST PASS 
  //
  timeoutObj = testFunction

  console.log(1, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  timeoutObj = { callback: testFunction } 

  console.log(2, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  timeoutObj = { callback: testFunction, milliseconds: 30000 }

  console.log(3, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  timeoutObj = { 
    callback: testFunction, 
    milliseconds: 30000, 
    params: { 
      userid: '02091963', 
      text: 'bla bla bla' 
    } 
  }

  console.log(4, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  timeoutObj = testFunction

  console.log(5, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  // 
  // MUST NOT PASS
  //
  
  timeoutObj = { 
    text: 'this is a valid sentence', 
    speech: true
  }

  console.log(6, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()

  timeoutObj = 4562 

  console.log(7, timeoutObj)
  console.log( validateTimeout(timeoutObj) )
  console.log()
}  


module.exports = { validateTimeout }

