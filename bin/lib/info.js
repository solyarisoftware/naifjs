const { spawnSync } = require('child_process')
const { version, author, description } = require('../../package')

function banner() {
  return (
  //'\x0Bc' +
  ' _   _       _  __     _ \n' +
  '| \\ | |     (_)/ _|   | |    \n' +
  '|  \\| | __ _ _| |_    | |___ \n' +
  '| . ` |/ _` | |  _|   | / __|\n' +
  '| |\\  | (_| | | || |__| \\__ \\\n' +
  '|_| \\_|\\__,_|_|_| \\____/|___/\n' +
  '\n' +
  description + '\n' +
  `version: ${version}, author: ${author.email}\n`
  )
}


// $ npm root -g
// /usr/local/lib/node_modules
function getNpmRootDirectory() {
  return ( 
    spawnSync('npm', ['root', '-g'])
    .stdout
    .toString()
    .replace(/(\r\n|\n|\r)/g, '')
  )  
}


function commands() {
  return ( 
    'Usage:\n\n' +
    '    naif init              create new project directory\n' +
    '    naif new project\n' +
    '\n' +
    '    naif generate          create dialog unit skeleton source code.\n' +
    '    naif new unit\n' +
    '\n' + 
    '    naif shell             command line dialog tester\n' +
    '    naif test shell\n' +
    '\n' + 
    '    naif telegram          telegram bot dialog tester\n' +
    '    naif test telegram\n' +
    '\n' + 
    '    naif show              show dialog units and states of a directory.\n' +
    '\n' +
    '    naif help              show this help\n' +
    '\n'
  )  
}  


function projectInfo() {
  return ( 
  `Documentation:\n${naifjsHomeDirectory}/README.md\n` +
  '\n' + 
  `Examples:\n${naifjsHomeDirectory}/examples\n` +
  '\n'  
  )  
}  

function info() {
  return (
    banner() + 
    '\n' + 
    projectInfo() +
    //'\n' + 
    commands() 
  )  
}  

const npmRootDirectory = getNpmRootDirectory()
const naifjsHomeDirectory = npmRootDirectory + '/naifjs'

module.exports = { banner, commands, projectInfo, info } 

// test
if (require.main === module) {
  //console.log( banner() )
  //console.log( commands() )
  //console.log( projectInfo() )
  console.log( info() )
}  

