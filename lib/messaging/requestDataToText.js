const { isString } = require('./isString')

/**
 * toText
 * extract the text attribute from a request data object  
 * assuming the requestData argument has already been validated
 *
 * @param {RequestDataObject} requestData
 *
 * valid examples:
 *   
 *   validateRequestData({text: '    user utterance '}) 
 *   // ->  'user utterance'
 *   
 * @return {String} valid request data object
 *
 */
function toText(requestData, toTrim=true) {
  if( isString(requestData) )
    return (toTrim ? requestData.trim() : requestData)
  else    
    return (toTrim ? requestData.text.trim() : requestData.text)
}


// test
if (require.main === module) {

  let data

  data = 'this is an utterance   '
  
  console.log(1, data)
  console.log( toText(data) )
  console.log()

  data = { text: '  this is a valid RequestData  ' }
  
  console.log(2, data)
  console.log( toText(data) )
  console.log()
}  


module.exports = { toText }
