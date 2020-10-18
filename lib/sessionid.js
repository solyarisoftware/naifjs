/**
 * local memory to store current session id
 * @private
 */
let sessionid


function getSessionId() {
  return sessionid
}  


function setSessionId(id) {
  return (sessionid = id)
}  


// test
if (require.main === module) {

  const id1 = setSessionId('123456')
  console.log('setSessionId("123456") : ' + id1)

  const id2 = getSessionId()
  console.log('getSessionId() : ' + id2)
}  


module.exports = { 
  
  getSessionId,

  // aliases for getSessionId
  sessionId: getSessionId,
  getCurrentSession: getSessionId,
  getUser: getSessionId,
  chatid: getSessionId,

  setSessionId,

  // aliases for setSessionId 
  setUser: setSessionId,
  setChat: setSessionId

}

