const path = require('path')

/**
 * build stateids
 *
 * @param {object} unitStatesObj containing state handlers (function pointers)
 * @param {string} unitName name of the unit
 * @return {object} object containing all stateids handlers fullnames
 *
 * usage example:
 *
 *   // in a naif dialog module
 *   const unitName = 'conosciamoci.js'
 *
 *   // dialog states of this unit
 *   const conosciamoci = {
 *     start,
 *
 *     getFirstName,
 *     getLastName,
 *     confirmFullName,
 *
 *     getGender,
 *     getAge,
 *     getCountry,
 *     confirmPersonal,
 *
 *     getFirstLanguage,
 *     getSecondLanguage,
 *
 *     confirmAll
 *   }
 *
 *   const state = buildStateIds(conosciamoci)
 *   // return object:
 *   // {
 *   //   start: 'conosciamoci.start',
 *   //   getFirstName: 'conosciamoci.getFirstName',
 *   //   getLastName: 'conosciamoci.getLastName',
 *   //   confirmFullName: 'conosciamoci.confirmFullName',
 *   //   getGender: 'conosciamoci.getGender',
 *   //   getAge: 'conosciamoci.getAge',
 *   //   getCountry: 'conosciamoci.getCountry',
 *   //   confirmPersonal: 'conosciamoci.confirmPersonal',
 *   //   getFirstLanguage: 'conosciamoci.getFirstLanguage',
 *   //   getSecondLanguage: 'conosciamoci.getSecondLanguage',
 *   //   confirmAll: 'conosciamoci.confirmAll'
 *   //  }
 *
 *   // inside a state function handler, for a state transaction
 *   next(state.getLastName, id)
 *
 */
function buildStateIds(unitStatesObj, unitName) {

  if (!unitName) 
    unitName = path.basename(__filename, '.js')

  const stateids = {}
  const stateNames = Object.keys(unitStatesObj)

  for (const stateName of stateNames)
    stateids[stateName] = unitName + '.' + stateName

  return stateids
}



/*
 * module test
 * @private functions
 */
if (require.main === module) {
  buildStateIdsTest()
}


function next(stateid) {
  console.log( 'stateid: ' + stateid )
}

/*
function buildAllStateIdsTest() {

  const DialogsFake = {
    firstUnit: {
      unit: {
        dogIntroduction: function dogIntroduction(){},
        presentations: function presentations(){},
        verifyName: function verifyName(){}
      },
      states: [ 'dogIntroduction', 'presentations', 'verifyName' ]
    },
    secondUnit: {
      unit: {
        askRestart: function askRestart(){},
        restart: function restart(){}
      },
      states: [ 'askRestart', 'restart' ]
    }
  } 

}
*/

function buildStateIdsTest() {

  // in a naif dialog module
  //const unitName = 'conosciamoci.js'
 
  // define fake (void) function handlers 
  const start = () => {}

  const getFirstName = () => {}
  const getLastName = () => {}
  const confirmFullName = () => {}
 
  const getGender = () => {}
  const getAge = () => {}
  const getCountry = () => {}
  const confirmPersonal = () => {}
 
  const getFirstLanguage = () => {}
  const getSecondLanguage = () => {}
 
  const confirmAll = () => {}

  // dialog states of this unit
  const conosciamoci = {
    start,

    getFirstName,
    getLastName,
    confirmFullName,
 
    getGender,
    getAge,
    getCountry,
    confirmPersonal,
 
    getFirstLanguage,
    getSecondLanguage,
 
    confirmAll
   }
 
   const state = buildStateIds(conosciamoci , 'conosciamoci')
   // return object:
   // {
   //   start: 'conosciamoci.start',
   //   getFirstName: 'conosciamoci.getFirstName',
   //   getLastName: 'conosciamoci.getLastName',
   //   confirmFullName: 'conosciamoci.confirmFullName',
   //   getGender: 'conosciamoci.getGender',
   //   getAge: 'conosciamoci.getAge',
   //   getCountry: 'conosciamoci.getCountry',
   //   confirmPersonal: 'conosciamoci.confirmPersonal',
   //   getFirstLanguage: 'conosciamoci.getFirstLanguage',
   //   getSecondLanguage: 'conosciamoci.getSecondLanguage',
   //   confirmAll: 'conosciamoci.confirmAll'
   //  }
 
   // inside a state function handler, for a state transaction
   next(state.getLastName)
}  


module.exports = { buildStateIds }

