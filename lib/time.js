
function unixTimeSecs() {
  return Math.floor(Date.now() / 1000)
}  

function unixTimeMsecs() {
  return Math.floor(Date.now())
}  


module.exports = { 

unixTimeSecs,
unixTimeMsecs,
unixTime: unixTimeMsecs // alias

}  
