/*
 * dialog status as pointer to actual handler function
 * @private
 */
let unit
let state

//const TAGREGEXP = /[.:/]/
const TAGREGEXP = '.'

/**
 * get current dialog stateid 
 * @return {String}
 */
function getCurrentUnitState() {
  return `${unit}.${state}`
}  

function setCurrentUnitState(unitState) {

  [unit, state] = unitState.split(TAGREGEXP)
  return [ unit, state ] 

}  


function getCurrentUnit() {
  return unit
}  


function setCurrentUnit(unitid) {
  return (unit = unitid)
}  


function getCurrentState() {
  return state
}  


function setCurrentState(stateid) {
  return (state = stateid)
}  


// test
if (require.main === module) {

  console.log('setCurrentState("start") : ' + setCurrentState('start') )
  console.log('getCurrentState() : ' + getCurrentState())

  console.log('setCurrentUnit("myUnit") : ' + setCurrentUnit('myUnit') )
  console.log('getCurrentUnit() : ' + getCurrentUnit())

  console.log('getCurrentUnitState() : ' + getCurrentUnitState())
  console.log()

  console.log('setCurrentUnitState("anotherUnit.anotherState") : ' + setCurrentUnitState('anotherUnit.anotherState'))

  const [unit, state] = setCurrentUnitState('anotherUnit.anotherState')
  console.log('unit: '+ unit)
  console.log('state: '+ state)

  console.log('getCurrentUnitState() : ' + getCurrentUnitState())
  console.log('getCurrentUnit() : ' + getCurrentUnit())
  console.log('getCurrentState() : ' + getCurrentState())
}  


module.exports = { 

  getCurrentUnit,
  currentUnit: getCurrentUnit, // alias

  setCurrentUnit,

  getCurrentState,
  currentState: getCurrentState,

  setCurrentState,

  getCurrentUnitState,
  currentUnitState: getCurrentUnitState, // alias
  stateid: getCurrentUnitState, // alias

  setCurrentUnitState

}

