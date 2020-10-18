const { getSessionId } = require('./sessionid')

/*
 * User session timeouts hash. Just in memory.
 */
const SessionTimeouts = {}


/**
 * default timeout time
 * @private
 */
let defaultTimeoutTime = 15000 // 15 seconds 


/**
 * set default timeout time
 *
 * @public
 * @param {Number} timeMsec in milliseconds
 */
function setDefaultTimeoutTime(milliseconds) {
  defaultTimeoutTime = milliseconds
}


/**
 *
 * @public
 * @param {Number} timeMsec in milliseconds
 */
function getDefaultTimeoutTime() {
  return defaultTimeoutTime
}


/**
 * Set timeout function
 *
 * @public
 * @param {function} callback - name of function to be called
 * @param {object} params - argument object for callback
 * @param {Number} milliseconds - timeout milliseconds [optional. default=10 secs]
 * @param {String} sessionid [optional]
 * @return {Number} callsCounter
 */
function startTimeout(callback, milliseconds, params, sessionid=getSessionId()) {
 
  // increment a counter each time the function is called
  if (SessionTimeouts[sessionid]) 
    SessionTimeouts[sessionid].callsCounter ++
  else {
    SessionTimeouts[sessionid] = {}
    SessionTimeouts[sessionid].callsCounter = 1 
  }

  // javascript setTimeout API takes 2 parameters that will be passed to the callback function
  //  1. sessionid: mandatory
  //  2. callbackArgs: optional data 0bject
  SessionTimeouts[sessionid].handler = setTimeout(callback, milliseconds, sessionid, params)

  // return the counter
  return SessionTimeouts[sessionid].callsCounter
}


/**
 * Reset previously set timeout 
 *
 * @public
 * @param {String} sessionid [optional]
 */
function stopTimeout(sessionid=getSessionId()) {

  // if timeout have beeen created, clear it
  if ( SessionTimeouts[sessionid] ) {
    clearTimeout(SessionTimeouts[sessionid].handler)

    // remove item
    SessionTimeouts[sessionid] = undefined
  }

}


/**
 * get timeout counter 
 *
 * @public
 * @param {String} sessionid [optional]
 * @return {Number} callsCounter
 */
function getCounterTimeout(sessionid=getSessionId()) {
  if (SessionTimeouts[sessionid]) 
    return SessionTimeouts[sessionid].callsCounter
  else
    return 0
}


module.exports = { 

  getDefaultTimeoutTime,
  setDefaultTimeoutTime,

  startTimeout,
  stopTimeout,
  getCounterTimeout,
  
}

