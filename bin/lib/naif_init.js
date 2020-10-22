const fs = require('fs')
const { resolve, basename } = require('path')
const { version, author } = require('../../package')
const { banner } = require('./info')
//const COLOR = require('../../lib/color') 

const configDirectoryName = 'config'
const dialogunitsDirectoryName = 'dialogunits'
const sessionsDirectoryName = 'sessions'
const libDirectoryName = 'lib'
const logsDirectoryName = 'logs'

const DEFAULT_LOG_CONFIG = {
  timestampFormat: 'YY.MM.DD HH.mm.ss',
  substituteNewline: false,
  color: false
}  

const DIALOGLOG_CONFIG_FILE = JSON.stringify(DEFAULT_LOG_CONFIG, null, 2) + '\n'
const SESSION_FILE = '{}\n'


function projectReadme(projectName) {
  return (
    `# Project ${projectName}\n` +
    '\n' +
    'Directory structure:\n' +
    '  README.md\n' +
    `  ├── ${projectName}.js\n` +
    `  ├── ${configDirectoryName}\n` +
    '  │   ├── README.md\n' +
    '  │   └── log.json\n' +
    `  ├── ${dialogunitsDirectoryName}\n` +
    '  │   └── README.md\n' +
    `  ├── ${libDirectoryName}\n` +
    '  │   └── README.md\n' +
    `  ├── ${logsDirectoryName}\n` +
    '  │   └── README.md\n' +
    `  └── ${sessionsDirectoryName}\n` +
    '      ├── README.md\n\n' +
    '      └── sessions.json\n\n' +
    '\n' 
  )
}


function logo() {
  return (
   'naif init\n'  +
   `version: ${version}. Author: ${author.email}\n` + 
   'Create a dialog project directory\n' 
  )  
}  


/**
 * usage info 
 * @private
 * @param {string} errorMessage
 */
function usage(errorMessage) {
  
  console.log( banner() )
  console.log('Create a dialog project directory') 
  console.log()
  console.log('Usage:\n    naif init\n')
  console.log('    --dir=<directory path>')
  console.log('      Dialog units directory path')
  console.log()
  console.log('Examples:')
  console.log()
  console.log('   naif init')
  console.log('   naif init --dir=./examples/myApplication')
  console.log()

  if ( errorMessage ) {
    console.error(errorMessage)
    console.error()
  }  

}


/**
 * validate command line arguments 
 * @private
 */
function checkArgs(args) {

  // no arguments
  if ( Object.entries(args).length === 0 && args.constructor === Object ) {
    usage()
    process.exit()
  }

  // project directory
  // TODO
  if ( ! args.dir ) {
    usage('ERROR: project directory not specified.')
    process.exit()
  }  
}


function genericAdapterTemplate() {
  return fs.readFileSync(__dirname + '/templates/naif_init_generic.template.js')
}  


function commandLineAdapterTemplate() {
  return fs.readFileSync(__dirname + '/templates/naif_init_cli.template.js')
}  


function telegramAdapterTemplate() {
  return fs.readFileSync(__dirname + '/templates/naif_init_telegram.template.js')
}  


function configReadme() {
  return (
    '# Configuration\n' +
    '\n' +
    'The directory contains config files\n'
  )
}


function dialogUnitsReadme() {
  return (
    '# Dialog units\n' +
    '\n' +
    'The directory contains all dialog unit files\n'
  )
}


function sessionsReadme() {
  return (
    '# Sessions\n' +
    '\n' +
    'The directory contains sessions data storage (sessions.json)\n'
  )
}


function helpersReadme() {
  return (
    '# Helpers\n' +
    '\n' +
    'The directory contains javascript helpers modules to be used by dialog units\n'
  )
}


function logsReadme() {
  return (
    '# Logs\n' +
    '\n' +
    'The directory contains dialog log files\n'
  )
}


/**
 * naif init
 *
 * @public
 * @param {Object} args
 *
 */ 
function naifinit(args) {

  checkArgs(args)

  const projectDirectory = resolve(args.dir)
  const projectName = basename(projectDirectory)

  //console.log(projectDirectory)
  //console.log(projectName)

  console.log()
  console.log( logo() )
  //console.log( `creating directory tree for project ${projectName}...` )

  const configSubDirectory = `${projectDirectory}/${configDirectoryName}`
  const dialogUnitsSubDirectory = `${projectDirectory}/${dialogunitsDirectoryName}`
  const sessionsSubDirectory = `${projectDirectory}/${sessionsDirectoryName}`
  const helpersSubDirectory = `${projectDirectory}/${libDirectoryName}`
  const logsSubDirectory = `${projectDirectory}/${logsDirectoryName}`

  if (args.dir === '.') {
    console.error('ERROR: project directory already exist\n')
    process.exit()
  }

  // create directory, just if directory doesn't exist
  if ( fs.existsSync(projectDirectory) ) {
    console.error(`ERROR: project directory: ${projectDirectory} already exist\n`)
    process.exit()
  }

  // create project directory and the root README file
  fs.mkdirSync(projectDirectory)
  fs.writeFileSync(projectDirectory + '/README.md', projectReadme(projectName) )
  fs.writeFileSync(projectDirectory + '/index.js', genericAdapterTemplate() )

  // create subdirectories and README files
  fs.mkdirSync(configSubDirectory)
  fs.writeFileSync(configSubDirectory + '/README.md', configReadme() )
  fs.writeFileSync(configSubDirectory + '/logdialog.json', DIALOGLOG_CONFIG_FILE  )
  
  fs.mkdirSync(dialogUnitsSubDirectory)
  fs.writeFileSync(dialogUnitsSubDirectory + '/README.md', dialogUnitsReadme() )
  
  fs.mkdirSync(sessionsSubDirectory)
  fs.writeFileSync(sessionsSubDirectory + '/README.md', sessionsReadme() )
  fs.writeFileSync(sessionsSubDirectory + '/sessions.json', SESSION_FILE )
  
  fs.mkdirSync(helpersSubDirectory)
  fs.writeFileSync(helpersSubDirectory + '/README.md', helpersReadme() )
  
  fs.mkdirSync(logsSubDirectory)
  fs.writeFileSync(logsSubDirectory + '/README.md', logsReadme() )

  console.log( 'New NaifJs application has been initialized:\n' + projectDirectory )
  console.log( `${projectDirectory}/index.js is a generic adapter template` )
  console.log()
  //console.log( projectReadme(projectName) )
}


module.exports = { naifinit }

