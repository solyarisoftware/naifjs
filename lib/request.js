const { Dialogs } = require('./unitsLoader')
const { validateRequestData } = require('./messaging/validateRequestData')
const { stopTimeout } = require('./timeouts')
const { setSessionId } = require('./sessionid')
const { addDataToSession, getSession, } = require('./sessions') 


/**
 * request
 * the user message trigger the the engine  
 *
 * @param {String} sessionid
 * @param {RequestDataObject | String} data - request data payload object
 *
 */
function request( sessionid, data ) { 

  // data could be a RequestDataObject ora String
  const validatedRequest = validateRequestData(data)

  setSessionId(sessionid)

  // clear any pending timeout action
  stopTimeout(sessionid)

  // Retrieve unit and state from session data
  const session = getSession(sessionid)

  const {unit, state} = session

  // add request to session data
  addDataToSession(sessionid, { request: validatedRequest } )

  // DEBUG
  //console.log('calling dialog:', unit, ' state: ', state)

  //
  // Call INPUT NODE function handler
  // first argument is a validated RequestDataObject
  // second argument is the session id
  // https://stackoverflow.com/questions/8206453/call-function-by-string-name-on-node-js 
  // 
  Dialogs[unit].unit[state](validatedRequest, sessionid)
}


module.exports = { 

  request,
  run: request, // alias

}

