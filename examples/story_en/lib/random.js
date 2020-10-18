//
// Utility function:
// random select an item from an array (of strings)
//
// @param {String[] | String}
// @example [ "chi sei?", "Come ti chiami?" ]
// @example 'chi sei?|Come ti chiami?'
//
// @returns {String}
//
function rand(arg) {

  if ( Array.isArray(arg) )
    return randFromArray(arg) 
  else if ( isString(arg) ) 
    return randFromArray(arg.split('|'))
  else 
    throw new Error('argument type must be string or array of strings.')

}

// Returns if a value is a string
function isString (value) {
  return typeof value === 'string' || value instanceof String
}

function randFromArray(array) {
  return array[Math.floor(Math.random()*array.length)]
}  


/**
 *  return randomly the string passed as parameter, or a void string
 */
function optional(str) {
  return Math.random() > 0.5 ? str : ''
}


function shuffle(array) {
  const arrayCopy = [...array]
  return arrayCopy.sort(function() { return 0.5 - Math.random() });
}


function shuffleSubset(array, n) {
  const arrayCopy = [...array]
  arrayCopy.sort(function() { return 0.5 - Math.random() });
  
  if ( n < arrayCopy.length ) 
    return arrayCopy.slice( 0, n )
  else 
    return arrayCopy
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/*
 *
 * @private
 */ 
if (require.main === module) 
  main()

function main() {

  console.log( getRandomInt(1,5) ) 
  const ARRAY = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

  console.log( optional( 'quanti anni hai?' ) )

  console.log( shuffle(ARRAY) ) 
  console.log( shuffleSubset(ARRAY, 6) ) 

  console.log( rand( ['chi sei?', 'come ti chiami?'] ) )
  console.log( rand( 'chi sei?|come ti chiami?' ) )
  console.log( rand( 'per bacco' ) )
}


module.exports = {rand, optional, shuffle, shuffleSubset, getRandomInt, getRandomArbitrary}

