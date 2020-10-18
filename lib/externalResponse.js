/**
 * local pointer to external function to reply
 * @private
 */
let externalResponse


function getExternalResponse() {
  return externalResponse
}  


function setExternalResponse(func) {
  return (externalResponse = func)
}  


// test
function test(param) {
  console.log(param)
}  

if (require.main === module) {

  console.log('setExternalResponse(test) : ' + setExternalResponse(test) )

  console.log('getExternalResponse() : ' + getExternalResponse() )

  getExternalResponse()('ciao')

}  


module.exports = { 
  
  getExternalResponse,
  setExternalResponse

}

