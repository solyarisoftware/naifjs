/**
 * index.js
 * generic NaifJs main application template
 *
 */
const naif = require('naifjs')
const logdialog = require('naif').logdialog

const startStateId = 'unitName.start'
const unitsDirectory = './units/' 
const logfileName = './logs/dialogs.log' 
const sessionsfile = './sessions/sessions.json' 
const sessionid = 'anUserid'

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
    logdialog.response(sessionid, `[${data.stateid}] ${data.text}`)
}


/**
 * shutdown naif engine and exit from current process.
 */ 
async function exit() {

  // shutdown naif engine
  await naif.down()

  if (logfileName)
    logdialog.close()

  // exit from current process
  process.exit(0)
}  

process.on('SIGINT', () => { exit() })

function main() {

  // open dialogs log file
  if (logfileName)
    logdialog.open(logfileName)

  // NaifJs dialog engine setup
  naif.up( unitsDirectory, response, sessionsfile, ()=>{}, false )

  naif.start(sessionid, startStateId)

    // user texted 
    const sentence = 'bla bla bla'
    if (logfileName)
      logdialog.request(sessionid, `[text] ${sentence}`)

    naif.request(sessionid, {text: sentence, speech: false})

}

main()

