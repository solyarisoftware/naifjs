const { toText } = require('./messaging/requestDataToText')

// module scoped variables 
let  matches = {}
let  sentence = ''


/**
 * take 
 * get ta Request Data object (ora a flat string) 
 * and save locally the text (the user sentence)
 * to be used for successive primitives ( match(), etc. )
 *
 * @param {RequestDataObject} requestData
 * @return {String}
 *
 */ 
function take(requestData) {

  // reset matches
  matches = {}

  // if requestData is an object
  // return the text attribute
  // otherwise return requestData that's already a string
  return( sentence = toText(requestData) )
}


function equal(sentenceArg) {
  return( sentence === sentenceArg )
}  


/**
 * regex match 
 *
 * @param {Regexp} regexp
 * @return {String} javascript regexp object input property
 */ 
function match(regexp) {
  matches = sentence.match(regexp)
  return( (matches || {}).input )
}    

/**
 * regex match 
 * return input property
 */ 
function matchSentence(sentenceArg, regex) {
  const arrayMatches = sentenceArg.match(regex)
  return( (arrayMatches || {}) )
}    


function slots() {
  return(matches.groups)
}


/**
 * Slot by name
 *
 * @param {string} name 
 * @return {string} named group value
 *
 * @example /dalle (?<toTime>.+)/ 
 *          'dalle 2:30'
 *          entity('toTime') === '2:30'
 *
 */
function slotByName(name) {
  return(matches.groups[name])
}


/**
 * @private
 */ 
function test1(requestData) {
  
  console.log('test 1: take, match')

  // regexp rule to get a first name 
  // Anna Lisa
  // Pier Luigi
  // Giorgio La Malfa
  const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
  const introNameReg = '^(mi chiamo |chiamami |sono |il mio nome è )?'
  const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 
  const HELLO_REGEXP = /ciao|buongiorno|buonasera|buon pomeriggio|olà|salve/i

  switch ( take(requestData) ) {
 
    // ciao
    // buongiorno
    case match( HELLO_REGEXP ):
      
      console.log('ciao a te! Piacere di conoscerti. Tu come ti chiami?')
      break

    // ciao, mi chiamo Pio
    // sono Pio
    // chiamami anna Lisa
    // il mio nome è Pio Nono
    case match( FIRSTNAME_REGEX ): {

      const firstName = slots().firstName

      console.log(`Ti chiami ${firstName}!`)
      break
    }

    // balblabla
    default:

      console.log( 'non ho capito.' )
      break
  }

  console.log()
}


/**
 * @private
 */ 
function test2(requestData) {
  
  console.log('test 2: take, match, slotByName, equal')

  // regexp rule to get a first name 
  // Anna Lisa
  // Pier Luigi
  // Giorgio La Malfa
  const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
  const introNameReg = '^(mi chiamo |chiamami |sono |il mio nome è )?'
  const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 

  take(requestData)

  console.log( 'match(FIRSTNAME_REGEX)')
  console.log( match(FIRSTNAME_REGEX) )
  console.log()

  console.log( 'slotByName(firstName)')
  console.log( slotByName('firstName') )
  console.log()
  
  console.log( 'equal(Gian Carlo)')
  console.log( equal('Gian Carlo') )

  console.log()
}  
  

/**
 * @private
 */ 
function test3(requestData) {
  
  console.log('test 3: take, slots, slotByName')

// regexp pattern to get a valid time 
//
// examples:
//   tra 8 minuti
//   tra 7 secondi
//   tra 2 min e 4 sec
//   30 secondi
//   2 minuti54 secondi
//   10 minuti  e 34   secondi

  const IN_TIME_REGEXP = /^(?:tra\s+)?(?:(?<minutes>\d+)\smin(ut[oi])?)?(?:\s+(e\s+)?)?(?:(?<seconds>\d+)\s+sec(ond[oi])?)?$/

  take(requestData)

  console.log( 'match(IN_TIME_REGEXP)')
  console.log( match(IN_TIME_REGEXP) )
  console.log()

  console.log( 'slots().minutes')
  console.log( slots().minutes )
  console.log( 'slots().seconds')
  console.log( slots().seconds )
  console.log()

  console.log( 'slotByName(minutes)')
  console.log( slotByName('minutes') )
  console.log( 'slotByName(seconds)')
  console.log( slotByName('seconds') )
  console.log()
}  

/**
 * @private
 */ 
function test4(requestData) {
  
  console.log('test 4: matchSentence')

  // regexp rule to get a first name 
  // Anna Lisa
  // Pier Luigi
  // Giorgio La Malfa
  const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
  const introNameReg = '^(mi chiamo |chiamami |sono |il mio nome è )?'
  const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 
  const HELLO_REGEXP = /ciao|buongiorno|buonasera|buon pomeriggio|olà|salve/i

  let m 
 
  const text = toText(requestData)

  switch (true) {
 
    // ciao
    // buongiorno
    case matchSentence(text, HELLO_REGEXP).input:
      
      console.log('ciao a te! Piacere di conoscerti. Tu come ti chiami?')
      break

    // ciao, mi chiamo Pio
    // sono Pio
    // chiamami anna Lisa
    // il mio nome è Pio Nono
    case !!(m = matchSentence(text, FIRSTNAME_REGEX)).input: 

      
      console.log(`Ti chiami ${m.groups.firstName}!`)
      break

    // balblabla
    default:

      console.log( 'non ho capito.' )
      console.log(m)
      console.log(!! m.input)
      break
  }

  console.log()
}


// test
if (require.main === module) {
  
  test1( { text: 'mi chiamo Giuditta' } )
  test2('Gian Carlo')
  test3('tra 10 minuti  e 34   secondi')
  test4( { text: 'sono Gian Piero' } )

}  


module.exports = {

  match,
  equal,

  matchSentence,

  slots,
  entities: slots, // alias

  slotByName,
  entityByName: slotByName, // alias

  toText,

  take

}

