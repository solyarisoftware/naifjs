const { getExternalResponse } = require('./externalResponse')
const { startTimeout } = require('./timeouts')
const { validateTimeout } = require('./messaging/validateTimeout')
const { validateResponseData, addWaitFlag } = require('./messaging/validateResponseData')
const { getSessionId } = require('./sessionid')
const { addDataToSession } = require('./sessions') 
const { getCurrentUnitState } = require('./stateid')
const { warning } = require('./devlog')


/**
 * response
 *
 * send a message to user, through an external function
 * set timeout callback if arg is specificed
 *
 * @param {String|ResponseDataObject} data    response data  Mandatory param
 * @param {TimeoutObject} timeoutDescriptor                  optional param 
 * @param {String} sessionid                                 optional param
 *
 * Where: 
 * @param {Object} TimeoutObject
 * @param {function} TimeoutObject.callback   function pointer
 * @param {ParamsObject} TimeoutObject.params parameters object 
 * @param {number} TimeoutObject.milliseconds number of timeout milliseconds 
 *
 *
 * @see https://www.jstips.co/en/javascript/passing-arguments-to-callback-functions/
 *
 * @return {function} externalResponse callback
 *
 */
function response(data, timeoutDescriptor, sessionid=getSessionId()) {

  const validatedData = validateResponseData(data)

  // start a timeout if argument 'timeoutDescriptor' is specificed
  if (timeoutDescriptor) {
    const { callback, params, milliseconds } = validateTimeout(timeoutDescriptor)

    startTimeout(callback, milliseconds, params, sessionid)
  }  

  // add the stateid to the ResponseDataObect
  validatedData.stateid = getCurrentUnitState()

  // add response to session data
  addDataToSession(sessionid, { response: validatedData } )

  //debug
  //console.info(validatedData)

  // run the callback, after a data object validation
  return getExternalResponse()(sessionid, validatedData)
}


/**
 * say
 * nowait response
 */ 
function say(data, sessionid) {
  return response(data, null, sessionid) 
}  


/**
 * ask
 * response that wait feedback from the user
 */ 
function ask(data, timeoutDescriptor, sessionid) {

  if ( !timeoutDescriptor )
    warning(`prompt(${JSON.stringify(data)}) without 'timeoutDescriptor' argument!`)

  // add wait flag to the data object
  return response(addWaitFlag(data), timeoutDescriptor, sessionid)
}  


module.exports = { 

  response,

  say, 
  reply: say, // alias

  ask,
  prompt: ask, // alias
  
}

