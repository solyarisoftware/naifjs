// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env['NTBA_FIX_319'] = 1

const telegramBot = require('node-telegram-bot-api')

const naif = require('../../')
const { version, author } = require('../../package')
const { banner } = require('./info')
const { sendMessage } = require('../../lib/telegram/sendOrderedMessages')
const log = require('../../lib/logdialog')

function logo() {
  return (
   '\nnaif telegram \n'  +
   'test a dialog unit, running a Telegram bot\n' +
   `version: ${version} (alfa). Author: ${author.email}\n` 
  )  
}  

/**
 * naifshow usage info 
 */
function usage() {
  
  console.log( banner() )
  console.log('Telegram bot (on-the fly server) dialog tester:')
  console.log('A single specified dialog run on the instant messaging app.')
  console.log('To test multimedia chat interaction, with multiple users at once.')
  console.log()
  console.log('Usage:\n')
  console.log('    naif test telegram')
  console.log('    naif telegram')
  console.log()
  console.log('    --token=<your telegram bot token id>')
  console.log()
  console.log('    --dir=<directory path>')
  console.log('      Dialog units directory path')
  console.log()
  console.log('    --start=<unit.state>')
  console.log('      Initial dialog stateid in format "unit.state"')
  console.log()
  console.log('    [--chatids=<chatid1,chatid2,...>]')
  console.log('       list of telegram chat ids (comma separated, no blanks)')
  console.log()
  console.log('    [--logfile=<path/filename>]')
  console.log('       Log filename with directory path')
  console.log()
  console.log('    [--sessionsfile=<path/filename>]')
  console.log('       Sessions filename with directory path')
  console.log()
  console.log('Examples:')
  console.log()
  console.log('   naif telegram --token=YOUR_TELEGRAM_BOT_TOKEN \\')
  console.log('                 --dir=examples/yourApp \\')
  console.log('                 --start=yourDialogUnit.startState \\')
  console.log('                 --chatids=123456789,923465768,228765452 \\')
  console.log('                 --logfile=/dev/stdout \\')
  console.log('                 --sessionsfile=yourApp/sessions.json\n')
  console.log()

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

  // telegram token id 
  if ( ! args.token ) {
    usage('ERROR: token not specified.')
    process.exit()
  }  

  // default start state
  if ( ! args.start) {
    usage('ERROR: starting state stateid not specified.')
    process.exit()
  }  

  // dialogs directory
  if ( ! args.dir ) {
    usage('ERROR: dir not specified.')
    process.exit()
  }  

}


let bot
let logfileName

function naiftgbot(args) {

  checkArgs(args)

  console.log( logo() )

  // initialize the telegram bot, using a long polling connection
  bot = new telegramBot(args.token, {polling: true})

  // debug
  //console.log(bot)
  console.log('Application directory  : ' + args.dir)
  console.log('Sessions file          : ' + (args.sessionsfile ? args.sessionsfile : args.dir+'/sessions.json'))
  console.log('Dialog unit entry point: ' + args.start)
  console.log('Log file               : ' + args.logfile)

  if (args.chatids)
    console.log('Telegram chat ids      : ' + args.chatids)

  console.log()
  console.log('Telegram bot is up and running...')
  console.log()

  logfileName = args.logfile

  // open dialogs log file
  if (logfileName)
    log.open(logfileName)

  naif.up( args.dir, response, args.sessionsfile, end, false )

  // start the dialog for each chatid
  if (args.chatids) {
    const chatids = args.chatids
      .split(',')
      .filter(chatid => chatid.trim())

    for (const chatid of chatids) {
      sendMessage(bot, chatid, `🟢 star ${args.start}` )
      naif.start(chatid, args.start)
    }  
  }  

  // process any incoming message
  bot.on('message', msg => {

    // get user id and text message
    const chatid = msg.chat.id
    const sentence = msg.text

    //
    // forever loop logic:
    // as soon the user exit form a dialog, the dialog is restarted
    //
    if ( naif.isSessionActive(chatid) ) {
      // 
      // a dialog is active with the user. 
      // send user sentence to the dialog manager
      //
      naif.request(chatid, sentence)

      if (logfileName)
        log.request(chatid, sentence)
    }  
    else {
      //
      // no dialog active.
      // restart the dialog
      //
      sendMessage(bot, chatid, `🟢 stat ${args.start}` )

      naif.start(chatid, args.start)
    }  
  })    

}  

function end(chatid) {
  sendMessage(bot, chatid, `🔴 end ${naif.getCurrentUnitState()}` )
}  

function shutdown(signal) {
  console.log(`${signal} received...`)
  naif.down()

  if (logfileName)
    log.close()

  console.log('naif telegram shutted down.')
  process.exit(0)
}

/**
 * send a Telegram Bot text messsage
 * taking data.text from response object
 *
 * @param {string} chatid
 * @param {ResponseDataObject} data 
 *
 */ 
function response(chatid, data) {
   sendMessage(bot, chatid, data.text) 

   if (logfileName)
     log.response(chatid, `[${data.stateid}] ${data.text}`)
}  

process.on('SIGTERM', shutdown) 
process.on('SIGINT', shutdown) 

module.exports = { naiftgbot }

