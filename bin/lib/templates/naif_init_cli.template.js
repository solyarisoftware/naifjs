const os = require('os')
const readline = require('readline')

const naif = require('naifjs')
const log = require('naif').log

const startStateId = 'unitName.start'
const unitsDirectory = './units/' 
const logfileName = './logs/dialogs.log' 
const sessionsfile = './sessions/sessions.json' 
const sessionid = loginUserid()

/**
 * print to stdout the message to the user 
 *
 * @param {String} sessionid 
 * @param {ResponseDataObject} data
 *
 */ 
function response(sessionid, data ) { 

  console.log( data.text )

  if (logfileName)
    log.response(sessionid, `[${data.stateid}] ${data.text}`)
}


/**
 * end the application 
 */ 
function end() { exit() }


/**
 * shutdown naif engine and exit from current process.
 */ 
async function exit() {

  // shutdown naif engine
  await naif.down()

  if (logfileName)
    log.close()

  // exit from current process
  process.exit(0)
}  


function loginUserid() {
  const username = os.userInfo().username
  const hostname = os.hostname()
  return(`${username}@${hostname}`)
} 


function main() {

  // open dialogs log file
  if (logfileName)
    log.open(logfileName)

  // NaifJs dialog engine setup
  naif.up( unitsDirectory, response, end, sessionsfile, false )

}


// Command line events handling
const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '' 
})

cli.on('close', () => { exit() })
cli.on('SIGINT', () => { exit() })

naif.start(sessionid, startStateId)

// process stdin line
cli.on( 'line', sentence => { 
  
  sentence = sentence.trim()

  if (sentence) {
    
    // user texted 
    if (logfileName)
      log.request(sessionid, `[text] ${sentence}`)

    naif.request(sessionid, {text: sentence, speech: false})

  }  
})

main()

