/**
 * to send messages in order
 *
 * @see https://github.com/yagop/node-telegram-bot-api/issues/192
 * https://github.com/yagop/node-telegram-bot-api/issues/192#issuecomment-249488848
 *
 */ 
var Promise = require('bluebird')
var queue = []
var inUseQueue = []

function _sendMessages() {

  // if we are already sending messages from the queue, 
  // or the queue is empty, stop
  if (inUseQueue.length || !queue.length) return

  // console.log("processing queue")

  inUseQueue = queue
  queue = []

  Promise.mapSeries(inUseQueue, function(request) {
    var resolve = request.resolve
    var reject = request.reject
    var bot = request.bot

    // console.log("sending message '%s'", request.message)
      
    return bot.sendMessage(request.chatId, request.message)
      .then(resolve)
      .catch(reject)
  })
    .then(function() {
    //  console.log("queue processed")
        inUseQueue = []
        _sendMessages()
    })
}


function sendMessage(bot, chatId, message) {
  var resolve, reject
  var promise = new Promise(function(promiseResolve, promiseReject) {
    resolve = promiseResolve
    reject = promiseReject
  })
    
  //console.log("pushing message '%s' to queue", message)

  queue.push({ bot, chatId, message, resolve, reject })
  process.nextTick(_sendMessages)
  return promise
}

module.exports = { sendMessage }

