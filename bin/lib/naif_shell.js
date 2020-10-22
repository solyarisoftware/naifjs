const os = require('os')
const readline = require('readline')

const { up, down, start, request, banner, getCurrentUnitState } = require('../../')
const log = require('../../lib/logdialog')
const { dialogsAndStates } = require('../../lib/unitsLoader')
const { version, author } = require('../../package.json')

/*
 * 39 Default foreground
 * 30 Black
 * 31 Red
 * 32 Green
 * 33 Yellow
 * 34 Blue
 * 35 Magenta
 * 36 Cyan
 * 37 Light gray
 * 90 Dark gray
 * 91 Light Red
 * 92 Light Green
 * 93 Light Yellow
 * 94 Light Blue
 * 95 Light Magenta
 * 96 Light Cyan
 * 97 White
 */
const COLOR_ADMIN = 36
const COLOR_ERROR = 91
const COLOR_TEXT_RESPONSE = 92 // 36
const COLOR_SPEECH_RESPONSE = 93 // 36
const COLOR_DATA = 31


/**
 * naif test logo
 * @see  http://patorjk.com/software/taag/#p=testall&f=Blocks&t=naif test 
 */
function logo() { 
  return( `naif test. command line dialog tester
version: ${version}. Author: ${author.email}
 `)
}
   

/**
 * naifshell usage info 
 */
function usage(errorString) {
  
  console.log( banner() )
  console.log('Command line dialog tester') 
  console.log()
  console.log('Usage:\n')
  console.log('    naif shell')
  console.log('    naif test shell')
  console.log()
  console.log('    --dir=<directory path>')
  console.log('      Dialog units directory path')
  console.log()
  console.log('    --start=<unit.state>')
  console.log('      Initial dialog stateid in format "unit.state"')
  console.log()
  console.log('    [--id=<id>]')
  console.log('       session id. Optional argument')
  console.log()
  console.log('    [--logfile=<path/filename>]')
  console.log('       Log filename with directory path')
  console.log()
  console.log('    [--sessionsfile=<path/filename>]')
  console.log('       Sessions filename with directory path')
  console.log()
  console.log('    [--silent -s]')
  console.log('       Silent mode. Just dialog')
  console.log()
  console.log('Examples:')
  console.log()
  console.log('   naif test --start=firstUnit.start --dir=examples/myDialogs')
  console.log()
  console.log('   naif test --dir=examples/app \\')
  console.log('             --start=anotherUnit.showContents \\')
  console.log('             --id=123456 \\')
  console.log('             --logfile=examples/app/dialogs.log \\')
  console.log('             --sessionsfile=examples/app/sessions.json\n')

  if (errorString) 
    console.log(`\n\n  ${errorString}\n`, COLOR_ERROR)

  process.exit()
}


/**
 * validate command line arguments 
 */
function checkArgs(args) {

  // no arguments
  if ( Object.entries(args).length === 0 && args.constructor === Object ) {
    usage()
    process.exit()
  }

  // dialogs directory
  if ( ! args.dir ) {
    usage('ERROR: dir not specified.')
    process.exit()
  }  


  // default start state
  if ( ! args.start) {
    usage('ERROR: starting stateid not specified.')
    process.exit()
  }  

}


/**
 * console log (coloured) 
 *
 * @param {String} sentence
 * @param {Integer} color code
 * 
 * @see https://misc.flogisoft.com/bash/tip_colors_and_formatting
 *
 */ 
function writeTerminal(text, color=COLOR_ADMIN) {
  text = (text) ? text : '' 
  console.log(`\x1b[${color}m${text}\x1b[0m`)
}

/**
 * print to stdout the message to the user 
 *
 * @param {String} sessionid 
 * @param {ResponseDataObject} data
 *
 */ 
function response(sessionid, data ) { 

  writeTerminal( '\n' + data.text, (data.speech) ? COLOR_SPEECH_RESPONSE : COLOR_TEXT_RESPONSE)

  if (logfileName)
    log.response(sessionid, `[${data.stateid}] ${data.text}`)
}


/**
 * end the conversation 
 */ 
function end() {
  if ( !silent )
    writeTerminal('\n' + 'dialog end.')

  // shutdown the engine
  exit() 
}


/**
 * shutdown naif engine and exit from current process.
 */ 
async function exit() {

  if ( !silent ) 
    statistics()

  // shutdown naif engine
  await down()

  if (logfileName)
    log.close()

  if ( !silent ) 
    console.log('naif engine shutted down.')
  
  // exit from current process
  process.exit(0)
}  


/**
 * get os username 
 */
function loginUserid() {
  const username = os.userInfo().username
  const hostname = os.hostname()
  return(`${username}@${hostname}`)
} 


/**
 * check if a string is uppercase
 *
 * @param {String} str string to be check
 * @return {Boolean} true if the string is uppercase 
 * 
 * @example isUpperCase("hello"); // false
 * @example isUpperCase("Hello"); // false
 * @example isUpperCase("HELLO"); // true
 *
 */
function isUpperCase(str) { // eslint-disable-line no-unused-vars
  return str === str.toUpperCase()
}


/**
 * check if sentence is spoken or written
 * to simulate a spoken sentence, check if it is uppercase
 * @param {String} str string to be check
 * @return {Boolean} true if the string is spokene 
 */
function isSpoken(str) {
  return str === str.toUpperCase()
}


function help() {
  writeTerminal()
  writeTerminal('  Help:')
  writeTerminal()
  writeTerminal('  An utterance made by uppercased words emulate voice (speech) utterance:')
  writeTerminal()
  writeTerminal('    hello Giorgio -> is a chat (written) utterance')
  writeTerminal('    HELLO GIORGIO -> is considered a spoken utterance. Tip: use caps-lock key.')
  writeTerminal()
  writeTerminal('  Use Up-Arrow and Down-Arrow keys to scroll and retrieve previous utterances.')
  writeTerminal()
  writeTerminal('  CTRL-C to exit.')
  writeTerminal()

}


function statistics() {
  const wpu = (words/cpsIn).toFixed(2)

  writeTerminal()
  writeTerminal('Session Statistics:')
  writeTerminal()
  writeTerminal('Conversation Entry Point (stateid)   : ' + startStateId)
  writeTerminal('CPS (Conversation-turns Per Session) : ' + cpsIn)
  writeTerminal('CPS Written Utterances               : ' + (cpsIn - cpsInSpoken) )
  writeTerminal('CPS Spoken Utterances                : ' + cpsInSpoken)
  writeTerminal('WPU (Words Per Utterance)            : ' + ( isNaN(wpu)? 0 : wpu ) )
  writeTerminal('Elapsed Time (secs)                  : ' + (elapsedTime(startTime)/1000).toFixed(2) )
  writeTerminal()
}



//
// elapsed time 
//
function startTimer() {
  return new Date()
}


function elapsedTime(startTime) {
  const endTime = new Date()
  let timeDiff = endTime - startTime //in ms
  return timeDiff
}


/**
 * wordcount
 * @param {String} str
 * @see https://stackoverflow.com/a/18679657/1786393
 */  
function wordCount(str) {
  return str.split(' ')
    .filter(function(n) { return n != '' })
    .length
}


let firstTimeHelp = true
let cpsIn = 0
let cpsInSpoken = 0
let words = 0
let startStateId
let startTime
let logfileName
let silent


/*
 * naif test main
 */ 
function naifshell(args) {

  checkArgs(args)

  const sessionid = (args.id) ? args.id : loginUserid()
  const UnitsDirectory = args.dir
  startStateId = args.start
  logfileName = args.logfile
  silent = args.silent || args.s
  const sessionsfilePrompt = args.sessionsfile? args.sessionsfile : 'not specified -> ./sessions.json'

  // open dialogs log file
  if (logfileName)
    log.open(logfileName)

  if ( !silent )
    console.log( logo() )

  // NaifJs dialog engine setup
  // load units from specified folder
  up( UnitsDirectory, response, args.sessionsfile, end, false )

  if ( !silent ) {
    console.log('\nDialog Units Directory\n' + UnitsDirectory)
    console.log('\nDialog States')
    console.log(dialogsAndStates().join('\n'))
    console.log('\nStart Dialog\n' + startStateId)
    console.log('\nSessions File\n' + sessionsfilePrompt)
    console.log('\nSession id\n' + sessionid)

    if (logfileName)
      console.log('\nLog File\n' + logfileName)
  }  

  //
  // Command line events handling
  //
  const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '' //'>> '
  })

  // https://misc.flogisoft.com/bash/tip_colors_and_formatting
  cli.on('close', () => {
    if ( !silent )
      console.log( '\n' + 'Shutdown (session closed).' )

    exit()
  })

  //
  // Ctrl-C
  //
  cli.on('SIGINT', () => { 
    if ( !silent ) 
      console.log( '\n' +'Shutdown (Control-C).')

    exit() 
  })


  start(sessionid, startStateId)

  startTime = startTimer()

  // 
  // process stdin line
  // 
  cli.on( 'line', sentence => { 
    
    sentence = sentence.trim()

    if (sentence) {
      
      cpsIn ++
      words += wordCount(sentence)

      if ( isSpoken(sentence) ) {
        // user spoken 
        cpsInSpoken ++

        if (logfileName)
          log.request(sessionid, `[speech] ${sentence}`)
        
        request(sessionid, {text: sentence, speech: true})

      }  
      else {
        // user texted 
        if (logfileName)
          log.request(sessionid, `[text] ${sentence}`)

        request(sessionid, {text: sentence, speech: false})

      }  
    }  
    else {
      // no sentence (user press enter)
      writeTerminal(`stateid: ${getCurrentUnitState()}\n`, COLOR_DATA)
      writeTerminal('Write an utterance to continue.')

      if ( !silent ) 
        if (firstTimeHelp) {
          help()
          firstTimeHelp = false  
        }  
    }  

  })
}

module.exports = { naifshell }

