const { banner } = require('../bin/lib/info')

const { 
  getSessionId, 
  setSessionId 
} = require('./sessionid')

const { 
  getCurrentUnit, 
  getCurrentState, 
  getCurrentUnitState, 
  setCurrentUnitState 
} = require('./stateid')

const { setExternalResponse } = require('./externalResponse')

// dialog handlers loader
const { 
  Dialogs, 
  loadUnits, 
  printStates 
} = require('./unitsLoader')

const { 
  isSessionActive,
  setSession, 
  delSession, 
  initSessions, 
  dumpSessions 
} = require('./sessions') 
// eslint-disable-line no-unused-vars


/**
 * local pointer to external function to end
 * @private
 */
let externalEnd


/**
 * End of a conversation
 * Call an external handler
 *
 */
function end( sessionid=getSessionId() ) {
  
  // set session not active
  delSession(sessionid)

  externalEnd(sessionid) 
}


/**
 * up 
 * run the engine, loading session in memory 
 * 
 * @public
 *
 * @param {String} unitsFolder
 * @param {Function} responseCallback
 * @param {String} [sessionsFilename]
 * @param {Function} [endCallback]
 * @param {Boolean} [true] verbosity 
 *
 */
function up(unitsFolder, responseCallback, sessionsFilename, endCallback=()=>{}, verbose=true) {

  if (verbose) 
    console.info(banner())

  // load units
  build(unitsFolder, verbose)

  // assign external callback to reply 
  setExternalResponse(responseCallback)

  // assign external callback to end 
  externalEnd = endCallback

  // Load sessions in memory
  // if a valid filename is not passed, 
  // a sessions.json is created in the application directory
  initSessions(sessionsFilename ? sessionsFilename : unitsFolder+'/sessions.json')
  
}  


/**
 * shutdown the engine
 *
 * @public
 *
 */
function down() {

  // dump sessions to disk
  dumpSessions()

} 


/**
 * load units
 * get the dialogs lookup map
 *
 * @private
 * @param {String} unitsFolder
 * @param {Boolean} verbose
 *
 */
function build(unitsFolder, verbose) {

  loadUnits(unitsFolder, verbose)
  
  if (verbose)
    printStates()

}


/**
 * start a ne dialog session
 *
 * @public
 * @param {string} stateid unit.state string
 * @param {string} sessionid 
 * @param {AnyObject} argument (any object). It will passed to initial output state (by stateid) 
 */ 
function start(sessionid, stateid, argument) { 

  setSessionId(sessionid)

  // load the sessionid session assigning the initial stateid
  exec(stateid, sessionid, argument)

}


/**
 * schedule and run an OUTPUT NODE 
 *
 * @public
 * @param {string} stateid 
 * @param {string} [sessionid]
 * @param {AnyObject} argument (any object). It will passed to initial output state (by stateid) 
 *
 * action
 *   set next dialog handler
 *   pass start argument as output state function argument 
 *   call the dialog 
 *
 */ 
function exec(stateid, sessionid=getSessionId(), argument) {

  next(stateid, sessionid)

  //
  // Call OUTPUT state function handler
  // pass the user id and the arg to the called function 
  Dialogs[getCurrentUnit()].unit[getCurrentState()](sessionid, argument)

}


/**
 * schedule next INPUT NODE
 *
 * @public
 * @param {string} stateid 
 * @param {string} [sessionid]
 *
 * action
 *   prepare next dialog handler
 *   verify if unit.state exist looking at dialogs map
 *   store the status pointer
 *
 */ 
function next(stateid, sessionid=getSessionId()) {
  
  const [unit, state] = setCurrentUnitState(stateid)
  
  //
  // run-time state stateid validation
  //
  if ( !unit || !state ) 
    throw new Error('Wrong format. Please specify both unit and state with format: UnitName.StateName')
  
  if ( ! unitExist(unit) ) {
    const errorMsg = `dialog '${unit}' not found.`
    throw new Error(errorMsg)
  }  

  if ( ! stateExist(unit, state) ) {
    const errorMsg = `state '${state}' of dialog '${unit}' not found.`
    throw new Error(errorMsg)
  }  

  // Update session
  setSession(sessionid, unit, state)
}


/**
 * verify if unit exist in dialogs map
 *
 * @return {Boolean}
 *
 */ 
function unitExist(unit) {
  return Dialogs[unit] ? true : false
}


/**
 * verify if state exist in DialogName, looking up dialogs map
 *
 * @return {Boolean}
 *  
 */
function stateExist(unit, state) {
  return Dialogs[unit].states.includes(state)
}



// https://stackoverflow.com/a/3923258/1786393
module.exports = { 

  // out-dialog API
  getCurrentUnitState,
  currentUnitState: getCurrentUnitState, // alias

  up,
  start,

  down,

  // in-dialog API
  exec,
  goout: exec, // alias
  setOutputState: exec, // alias
  gotoOutputState: exec, // alias
  nextOutputState: exec, // alias

  next,
  goto: next, // alias
  goinp: next, // alias
  setInputState: next, // alias
  gotoInputState: next, // alias
  nextInputState: next, // alias
  
  end,
  exit: end, // alias
  quit: end, // alias
  
  isSessionActive,
  isDialogActive: isSessionActive // alias
  
}

