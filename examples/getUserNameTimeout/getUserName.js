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
const { 
  say, ask, next, end, match, slots, take,
  setChat, getCounterTimeout, startTimeout, stopTimeout
} = require('../../')

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
    
  say('Hello!')
  ask('What\'s your name?', askNameTimeout)

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

  // delay for the first timeout
  const DELAY_15S = 15 * 1000

  // the function askNameTimeout is called 15 secs  after the say statement 
  const repromptPolicy = { 
    callback: askNameTimeout, 
    milliseconds: DELAY_15S 
  }

  switch ( take(request) ) {
 
    // pattern 1
    case match( /hi|hello|good morning|good afternoon/i ):
      
      say( 'Hi there!' )
      ask( 'What\'s your name?', repromptPolicy )
      break

    // pattern 2
    case match( FIRSTNAME_REGEX ):

      say( `Nice to meet you, ${slots().firstName}!` )
      end()
      break

    // fallback pattern
    default:

      say( 'I do not understand.' )
      ask( 'What is your name?', repromptPolicy )
      break
  }
}


/**
 * ask name timeout handler
 *
 * @param {string} user id
 * @param {Object} params
 */ 
function askNameTimeout(userid, params) {

  const DELAY_30S = 30 * 1000
  const DELAY_60S = 45 * 1000

  setChat(userid)

  switch( getCounterTimeout() ) {

    case 1:
      // first timeout goes off
      say('What\'s your name?')

      // reschedule a timeout in 30 seconds
      startTimeout(askNameTimeout, DELAY_30S)
      break

    case 2:
      // second timeout
      say('Are you there? Please tell me what is your name')

      // reschedule a timeout in 60 seconds
      startTimeout(askNameTimeout, DELAY_60S)
      break

    case 3:
      // third timeout: close the conversation
      stopTimeout()
      end()
   }   
 }   


module.exports = getUserName

