const fs = require('fs')
const path = require('path')


/**
 * Dialogs 
 * is a dictionary data structure
 * each key is a dialog name (one dialog per file)
 * corresponding value is 
 * - a data structure containing Dialog object, 
 * - and a list of names of dialog methods.
 *
 * @return {object} 
 *
 */ 
const Dialogs = {}


/**
 * load dialog unit files in Dialogs object 
 *
 * @param {String} unitsFolder
 * @return {Object} Dialogs 
 * example of returned object
 *  {
 *   firstUnit: {
 *     unit: {
 *       dogIntroduction: [Function: dogIntroduction],
 *       presentations: [Function: presentations],
 *       verifyName: [Function: verifyName]
 *     },
 *     states: [ 'dogIntroduction', 'presentations', 'verifyName' ]
 *   },
 *   secondUnit: {
 *     unit: {
 *       askRestart: [Function: askRestart],
 *       restart: [Function: restart]
 *     },
 *     states: [ 'askRestart', 'restart' ]
 *  }
 *
 */ 
function loadUnits(unitsFolder, verbose=true) {

  // get all files in specified directory
  let allfiles = fs.readdirSync(unitsFolder) 

  // select only files with suffix .js or .naifjs
  let jsfiles = allfiles.filter( filename => /.+\.(?:naif)?js$/.test(filename) )

  if (verbose) console.log( '\nUnits' )

  // load all dialogs into Dialogs map data structure
  jsfiles.forEach( filename => {
    
    // TODO 
    // OPINABLE DECISION: 
    // dialogname is the corresponding filename without suffix
    // e.g. /your/path/yourUnit.js -> yourUnit 
    // e.g. /your/path/aSecondUnit.naifjs -> aSecondUnit
    const dialogname = path.parse(filename).name 

    const fullpathfilename = path.resolve(unitsFolder) + '/' + filename

    // TODO 
    // to check file permissions, because otherwise require(fullpathfilename) 
    // could fails in case of a file with no read permissions
    Dialogs[dialogname] = buildDialogDictionaryItem( require(fullpathfilename) )

    if (verbose) { 
     // console.log(fullpathfilename)
     console.log(path.resolve(fullpathfilename))
    }  
  })

  // debug
  //console.log(Dialogs)

  // https://stackoverflow.com/a/8300882/1786393
  return Dialogs 
}



/**
 *
 * Build a dialog unit dictionary item object 
 *
 * @typedef {Object} DialogDescriptor
 * @property {Object} unit - Unit Dialog object
 * @property {String[]} states - array of method names
 *
 * @returns {object} 
 *
 */ 
function buildDialogDictionaryItem(dialogUnit) {
  return { 
    unit: dialogUnit, 
    states: stateNames(dialogUnit) 
    }
}


/**
 * returns list of functions of passed dialog unit
 *
 * @param {Object} dialog unit object 
 * @returns {String[]} list of function names, as array of strings 
 *
 */ 
function stateNames(dialogUnit) {
  return (Object.getOwnPropertyNames(dialogUnit).filter(function (p) {
      return typeof dialogUnit[p] === 'function'
    }
  ))
}


/**
 * print for each dialog, corresponding states list
 */  
function printStates() {
  console.log('\nStates')
  Object.keys(Dialogs).forEach(e => 
    console.log(`${e} : ${stateNames(Dialogs[e].unit).join(', ')}`))
  //console.log('\n')

  return this 
}


function dialogsAndStates() {
  const array = []
  Object.keys(Dialogs).forEach(e => 
    array.push(`${e} : ${stateNames(Dialogs[e].unit).join(', ')}`))

  return array
}


/*
 * return dialog unit names list of the application
 *
 */ 
function appDialogNames() {
  return Object.keys(Dialogs) 
}


/*
 * return state names list of a specified dialog unit name
 *
 */ 
function stateNamesOfDialog(dialogUnitName) {
  return Dialogs[dialogUnitName].states
}


function buildAllTags() {

  const allTags = {}

    
  for (const unitName of appDialogNames()) {

    const unitTags = {}

    for ( const stateName of stateNamesOfDialog(unitName) )
      unitTags[stateName] =  unitName + '.' + stateName

    allTags[unitName] = unitTags 

  }

  return allTags
}


/*
 * module test
 */
if (require.main === module) {

  loadUnits('examples/story_it/', false) 

  const state = buildAllTags()

  console.log()
  console.log('buildAllTags() returns')
  console.log( buildAllTags() )
  console.log()

  console.log( `state.firstUnit.dogIntroduction: '${state.firstUnit.dogIntroduction}'` )
  process.exit()
}



// exports the variables and functions 
module.exports = { 
  Dialogs, 
  loadUnits, 

  appDialogNames,
  stateNamesOfDialog,

  printStates,
  dialogsAndStates,

  buildAllTags
}

