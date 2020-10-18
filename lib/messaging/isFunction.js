function isFunction(x) {
  return ( typeof x === "function" )
}


// test
if (require.main === module) {

  function testFunction() {
    console.log('testFunction')
  }

  console.log( isFunction(testFunction) )
  console.log( isFunction( {text: testFunction} ) )
}


module.exports = { isFunction }
