// require NaifJS dialog manager module
const {
  say, next, exec, setvar, getvar, 
  match, slots, take
} = require('../../')

// require random helper module
const { rand, optional, } = require('./lib/random')

//
// dialogs tag shortcuts
//
const verifyName = 'firstUnit.verifyName'
const presentations = 'firstUnit.presentations'

const askRestart = 'secondUnit.askRestart'

/**
 * sendImageDog
 *
 * write an ASCII art image of a dog,
 * simulating in text mode, an image output
 * @private
 */ 
function sendImageDog() {
   
   say(`
   o-''|\\_____/)
    \\_/|_)     )
       \\  __  /
       (_/ (_/ `) 
}


/** 
 * firstUnit 
 * dialog states and properties
 */
const firstUnit = {
  
  /**
   * dialog function: dogIntroduction
   * type: prompt 
   */
  dogIntroduction() {
    
    // visualize an "image"
    sendImageDog()

    say('Hello! I\'m Pluto. I\'m a dog.')
    say('What is your name?')
  
    next(presentations)
  },


  /**
   * presentations
   * input state function
   *
   * @param {requestDataObject} request
   */
  presentations(request) {
  
    // rule to get a first name 
    // Anna Lisa
    // Pier Luigi
    // Giorgio La Malfa
    const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
    const introNameReg = '^(my name is |you can name me |I\'m )?'
    const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 

    switch (take(request)) {
   
      // pattern 1
      case match( /hi|hello|good morning|good afternoon|greetings|hey|hallo|hallo|ciao/i ):
        
        say('Hello yourself! Nice to meet you.')
        say('What\'s your name?')
        break

      // pattern 2 
      case match( /I am a chicken/ ):
        
        say('Nice to meet you! You are a nice chicken.')
        say('What\'s your name?')
        break
     
      // pattern 3
      case match( FIRSTNAME_REGEX ): {

        // store name in a dialog unit variable
        const firstName = setvar('firstName', slots().firstName)

        say(rand(`Is ${firstName} your name?|Really is ${firstName} your name?`))
        
        next(verifyName)
        break
      }

      // balblabla
      default:

        say( rand('I do not understand.|I don\'t think I understand.|mmhhh.') )
        say( rand('What is your name?|What\'s your name?|What\'s with the name, anyway?') )
        break
    }
  },


  /**
   * subdialog function: 
   *   verifyName
   *
   * type: 
   *   sentence processing
   */
  verifyName(sentence) {

    switch(take(sentence)) {
       
      // Yes
      case match( /^(yes|really|true|right|correct|sure)/i ): {
        
        const firstName = getvar('firstName')

        say(rand(`Hi ${firstName}|Nice to meet you.${optional(' Your name is very nice!')}`))

        exec(askRestart)
        break
      }
     
      // No 
      case match( /^no/i ):
        
        say('What\'s with your name, anyway?')
        next(presentations)
        break

      // fallback
      default:
        say('I do not understand. What\'s your name?')
        next(presentations)
        break
    }
  }
}  

module.exports = firstUnit

