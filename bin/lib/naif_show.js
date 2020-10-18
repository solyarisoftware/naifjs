const { version, author } = require('../../package')

const { loadUnits, dialogsAndStates } = require('../../lib/unitsLoader')
const { banner } = require('./info')

function logo() {
  return (
   'naif show \n'  +
   `version: ${version}. Author: ${author.email}\n` + 
   'show dialog units and states of a directory\n' 
  )  
}  

/**
 * usage info 
 * @param {string} errorMessage
 */
function usage(errorMessage) {
  
  console.log( banner() )
  console.log('Dialog Units Description') 
  console.log()
  console.log('Usage:\n    naif show\n')
  console.log('    --dir=<directory path>')
  console.log('      Dialog units directory path')
  console.log()
  console.log('Examples:')
  console.log()
  console.log('   naif show --dir=./examples/myApplication')
  console.log()

  if ( errorMessage ) {
    console.log(errorMessage)
    console.log()
  }  

}


/**
 * validate command line arguments 
 */
function checkArgs(args) {

  // no arguments
  if ( Object.entries(args).length === 0 && args.constructor === Object ) {
    usage('ERROR: dir not specified.')
    process.exit()
  }

  // dialogs directory
  if ( ! args.dir ) {
    usage('ERROR: dir not specified.')
    process.exit()
  }  

}


function naifshow(args) {
  checkArgs(args)
  const UnitsDirectory = args.dir

  console.log( logo() )
  console.log( 'Directory\n' + UnitsDirectory )

  loadUnits( UnitsDirectory )

  console.log()
  console.log( 'States' )
  console.log(dialogsAndStates().join('\n'))
  console.log()
}

module.exports = { naifshow }

