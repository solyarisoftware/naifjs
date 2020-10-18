const { getSessionId } = require('./sessionid')
const { getCurrentUnit } = require('./stateid')
const { 
  getSessionVar, 
  setSessionVar, 
  delSessionVar, 
  delSessionVars,
} = require('./sessions') 


/**
 * set user variable
 *
 * @param {String} name of variable
 * @param {Object} value 
 * @param {String} unit name
 * @param {String} sessionid 
 *
 * @returns {Object} value
 *
 */
function setvar(name, value, unitid=getCurrentUnit(), sessionid=getSessionId()) {
  // DEBUG
  //console.log(sessionid, unitid, name, value)
  return setSessionVar(sessionid, unitid, name, value)
}


/**
 * get user session variable
 *
 * @param {String} name name of variable
 * @param {String} unit name of unit
 * @param {String} sessionid 
 * @returns {Object} 
 *
 */
function getvar( name, unitid=getCurrentUnit(), sessionid=getSessionId() ) {
  // DEBUG
  //console.log(sessionid, unitid, name)
  return getSessionVar(sessionid, unitid, name)
}


/**
 * del user session variable
 *
 * @param {String} name name of variable
 * @param {String} unit name of unit
 * @param {String} sessionid 
 *
 */
function delvar( name, unitid=getCurrentUnit(), sessionid=getSessionId() ) {
  return delSessionVar(sessionid, unitid, name)
}


/**
 * del all user session variables
 *
 * @param {String} unit name of unit
 * @param {String} sessionid 
 *
 */
function delvars( unitid=getCurrentUnit(), sessionid=getSessionId() ) {
  return delSessionVars(sessionid, unitid)
}



module.exports = { 

  getvar,
  setvar,

  delvar,
  delvars
  
}
