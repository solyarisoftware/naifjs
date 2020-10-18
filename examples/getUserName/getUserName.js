/**
 * dialog unit: getUserName
 * 
 * the dialog prompt the user asking his name, reply with an hello and end. 
 *
 * askName: is the (output state) entry point of the dialog 
 *
 * getName: is the input state that elaborate th user sentence.
 *          when the user reply a valid name, the dialog end.
 *
 */

// get naif dialog manager DSL statements
const { say, ask, next, end, match, slots, take } = require('../../')

// define states of current dialog unit 
const getUserName = { askName, getName }

// defines tags
//const askNameState = 'getUserName.askName'
const getNameState = 'getUserName.getName'

/**
 * askName
 * output state handler, dialog entry point (start) 
 */
function askName() {
    
  say( 'Hello!' )
  ask( 'What\'s your name?' )

  next(getNameState)
}


/**
 * getName
 * input state handler 
 *
 * @param {requestDataObject} request
 */
function getName(request) {

  // create a regexp rule to get a first name (e.g. Anna Lisa, Giorgio La Malfa)
  const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
  const introNameReg = '^(my name is |name me |I\'m )?'
  const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 

  switch ( take(request) ) {
 
    // pattern 1
    case match( /hi|hello|good morning|good afternoon/i ):
      
      say( 'Hi there!' )
      ask( 'What\'s your name?' )
      break

    // pattern 2
    case match( FIRSTNAME_REGEX ):

      say( `Nice to meet you, ${slots().firstName}!` )
      end()
      break

    // fallback pattern
    default:

      say( 'I do not understand.' )
      ask( 'What is your name?' )
      break
  }
}

module.exports = getUserName 

