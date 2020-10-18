const fs = require('fs')
const { unixTime } = require('./time')
const { warning, error } = require('./devlog')

//const TAGREGEXP = /[.:/]/

let Sessions 
let sessionsFilename


/**
 * set sessions filename for new sessions
 *
 * @param {String} filename
 * @returns {@Object} sessions hash
 *
 */ 
function initSessions(filename) {

  sessionsFilename = filename

  // load sessions syncronously from file
  Sessions = loadJSONFile()

  // for each session, set active flag to false 
  resetSessions(Sessions)

}  


/**
 * load all sessions in memory from disk JSON file. Syncronously.
 *
 * @returns {@Object} sessions hash
 *
 */ 
function loadJSONFile(filename=sessionsFilename) {
  
  if (! fs.existsSync(filename)) {
    return {}
  }  
    
  try {
    const data = fs.readFileSync(filename, 'utf8')

    // TODO
    // to purge void attributes (unit: {})  
    return JSON.parse(data)
  } 
  catch (err) {
    if (err.code === 'ENOENT') 
        error(`File ${filename} not found!`)
    else 
        throw err

    process.exit() 
  }
}


/**
 * load all sessions in memory from disk JSON file. Asyncronously.
 * @returns {promise} sessions hash
 *
 */ 
function loadJSONFileAsync(filename=sessionsFilename) {

  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', (err, data) => {
      err ? reject(err) : resolve( JSON.parse(data) )
    })
  })
}


/**
 * dump all sessions to disk (JSON file). Asyncronously. 
 *
 * @returns {Promise} sessions hash
 *
 */ 
function dumpSessionsAsync(filename=sessionsFilename) {
  return new Promise(function(resolve, reject) {

    const jsonData = JSON.stringify(Sessions, null, 2)
    
    fs.writeFile(filename, jsonData, function(err) {
      err ? reject(err) : resolve()
    }) 
  })    
}


/**
 *
 * dump all sessions to disk (JSON file). Syncronously. 
 *
 */ 
function dumpSessions(filename=sessionsFilename) {

  const jsonData = JSON.stringify(Sessions, null, 2)
    
  fs.writeFileSync(filename, jsonData, 'utf8')
}


/**
 * check if the session is active
 *
 * @param {Number} userId
 * @returns {Boolean} 
 *
 */ 
function isSessionActive(userId) {
  const session = Sessions[userId]
  return ( session && session.active) ? true : false
}


/**
 * del session means set session NOT active
 *
 * @param {Number} userId
 *
 */ 
function delSession(userId) {
  const session = Sessions[userId]
  session.active = false
}


/**
 * return stateTag value from a session
 *
 * @param {object} session
 * @returns {String} stateTag value
 *
 */ 
function stateTag(session) { // eslint-disable-line no-unused-vars
  return `${session.unit}.${session.state}`
}  

/**
 * set (create/update) user session (in memory hash)
 *
 * @param {Number} sessionId
 * @param {String} [startUnit] unit 
 * @param {String} [startState] state 
 * @param {object} [additionalDataObject] additional data object to be inserted as session attribute(s)
 *
 * @returns {Object} session object
 *
 */ 
function setSession(sessionId, unit, state, additionalDataObject={}) {

  // TODO check if unit & state are not null or undefined
  if ( ! Sessions[sessionId] ) { 

    // new session

    const baseObject = { 
      unit, 
      state, 
      time: unixTime(),
      active: true,
      variables: {}
    }

    Sessions[sessionId] =  {...baseObject, ...additionalDataObject}
  }  
  else {

    // update session. Maintains variables untouched.

    Sessions[sessionId].unit = unit
    Sessions[sessionId].state = state
    Sessions[sessionId].time = unixTime()
    Sessions[sessionId].active = true

    Sessions[sessionId] = { ...Sessions[sessionId], ...additionalDataObject}

  }  

  return Sessions[sessionId]
}


/**
 * add data to session 
 *
 * @param {Number} sessionId
 * @param {object} [data] data object to be added as session attribute
 *
 * @returns {Object} session object
 *
 */ 
function addDataToSession(sessionId,data={}) {
  return (Sessions[sessionId] = { ...Sessions[sessionId], ...data})
}


/**
 * deactivate all sessions (setting active flag to false)
 */
function resetSessions() {
  for (const sessionId in Sessions) {

    if (Sessions[sessionId].active === true) {
      warning('resetting left open session. ' +
        `User: ${sessionId}, Dialog: ${Sessions[sessionId].unit}:${Sessions[sessionId].state}`)
    }

    // anyway reset (deactivate) sessione state
    Sessions[sessionId].active = false
  }

}


/**
 * get user session (from memory hash)
 *
 * @param {Number} sessionId - user id (telegram Chat id)
 * @returns {Object} session object, new session if not found in hash
 *
 */ 
function getSession(sessionId) {

  const session = Sessions[sessionId]
  
  return ( session !== undefined ) ? session : setSession(sessionId)

}


/**
 * set user session variable, with unit scope
 * 
 * @param {String} sessionId 
 * @param {String} unit name of unit
 * @param {String} name name of variable
 * @param {Object} value 
 *
 * @returns {Object} value
 *
 */
function setSessionVar(sessionId, unit, name, value) {
  
  // initialize the unit object, if not exists
  if ( ! Sessions[sessionId].variables[unit] )
    Sessions[sessionId].variables[unit] = {}
  
  Sessions[sessionId].variables[unit][name] = value

  return Sessions[sessionId].variables[unit][name]
}


/**
 * get user session variable, with unit scope
 *
 * @param {String} sessionId 
 * @param {String} unit name of unit
 * @param {String} name name of variable
 *
 * @returns {Object} 
 *
 */
function getSessionVar(sessionId, unit, name) {

  // TODO
  //return Sessions[sessionId].variables[unit][name] ? Sessions[sessionId].variables[unit][name] : undefined 

  return Sessions[sessionId].variables[unit][name]
}


/**
 * delete user session variable, with unit scope
 *
 * @param {String} sessionId 
 * @param {String} unit name of unit
 * @param {String} name name of variable
 *
 */
function delSessionVar(sessionId, unit, name) {

  Sessions[sessionId].variables[unit][name] = undefined

}


/**
 * delete all user session variableis, withiin the unit scope
 *
 * @param {String} sessionId 
 * @param {String} unit name of unit
 *
 */
function delSessionVars(sessionId, unit) {

  Sessions[sessionId].variables[unit] = undefined

}


/**
 * firstTime
 *
 * @param {String} sessionId
 * @returns {Boolean} true if session data exist
 *
 */ 
function firstTime(sessionId) {

  return ! getSession(sessionId)

}


/**
 * lastTime
 *
 * @param {String} sessionId
 * @returns {Number} time  
 *
 */ 
function lastTime(sessionId) {

  return getSession(sessionId).time

}


/**
 * for unit test
 * @private
 */
function test() {
  
  let id, session, unit, state, variable
  let value = 0

  const SESSIONS_FILENAME = './sessions.json'
  console.log(`read session file ${SESSIONS_FILENAME} or create it if not exist`)
  initSessions(SESSIONS_FILENAME)

  console.log()
  console.log(firstTime('1827gshgsh'))
  console.log(lastTime(id))

  console.log('setSession 4 times')
  setSession('Marco Rissotto', 'unita_12', 'stato_34')
  setSession('103034393', 'firstDialog', 'start')
  setSession('476039356', 'secondDialog', 'end')
  setSession('Giorgio La Malfa', 'unita_1', 'stato_3')
  
  //console.log('All sessions')
  //console.dir(Sessions, { depth: null })
  
  console.log('another setSession and a getSession')
  id = '0000008' 
  unit = 'unita_8'
  state = 'stato_8'
  variable = 'firstName'

  session = setSession(id, unit, state)
  session = getSession(id, unit, state)
  console.log(session)
  
  console.log('setSessionVar ' + variable )
  setSessionVar(id, unit, variable, value + 1)

  console.log('All sessions')
  console.dir(Sessions, { depth: null })
  //process.exit(0)

  console.log('getSessionVar ' + variable )
  value = getSessionVar(id, unit, variable)
  console.log( `id: ${id}, ${variable}: ${value}` )

  session = setSession(id, 'anotherUnit', 'anotherState', {additionalAttr: 'blablabla'})
  session = getSession(id, 'anotherUnit', 'anotherState')
  console.log(session)
  
  //delSessionVar(id, unit, variable)

  /*
  id = '103034393'
  console.log( 'id: ' + id + ', isSessionActive: ' + isSessionActive(id) )
  console.log()
  
  id = '999999999'
  session = getSession(id)
  unit = session.unit
  state = session.state
  console.log( `id: ${id}, unit: ${unit}, state: ${state}` )
  console.log()
  */
    
  //console.log('Sessions:')
  //console.log(Sessions)
  //console.log()
  
  dumpSessions()
  
  /*
  dumpSessions(Sessions)
    .then( () => console.log('The file was saved.') )
    .catch( error => console.log('Error dumping file: ', error) )
  */
}


if (require.main === module) 
  test()


module.exports = { 
  getSession,
  setSession,
  delSession,
  
  addDataToSession,

  firstTime,
  lastTime,

  getSessionVar,
  setSessionVar,
  delSessionVar,
  delSessionVars,

  isSessionActive,
  
  initSessions,
  dumpSessions

  //loadJSONFileAsync,
  //dumpSessionsAsync 
}

