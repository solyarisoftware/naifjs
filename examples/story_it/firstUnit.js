// require NaifJS dialog manager module
const {
  say, next, exec, setvar, getvar, 
  match, slots, take
} = require('../../')

// require random helper module
const { rand, optional } = require('./lib/random')

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
 * initial output state function
 */
const firstUnit = {
  
  /**
   * dialog function: dogIntroduction
   * type: prompt 
   */
  dogIntroduction() {
    
    // visualize an "image"
    sendImageDog()

    say('Ciao, io sono Pippo e sono un cane.')
    say('Tu come ti chiami?')
  
    next(presentations)
  },


  /**
   * presentations
   * input state function
   * slots: firstName 
   *
   * @param {requestDataObject} request
   */
  presentations(request) {
  
    // rule to get a first name 
    // Anna Lisa
    // Pier Luigi
    // Giorgio La Malfa
    const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
    const introNameReg = '^(mi chiamo |chiamami |sono |il mio nome è )?'
    const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 

    switch( take(request) ) {
   
      // pattern 1
      // 
      // ciao
      // buongiorno
      case match( /ciao|buongiorno|buonasera|buon pomeriggio|olà|salve/i ):
        
        say('ciao a te! Piacere di conoscerti. Tu come ti chiami?')
        break

      // pattern 2 
      // 
      // io sono un pulcino
      case match( /sono un pulcino/ ):
        
        say('piacere di conoscerti, sei un pulcino simpatico. Tu come ti chiami?')
        break
     
      // pattern 3
      // 
      // ciao, mi chiamo Pio
      // sono Pio
      // chiamami anna Lisa
      // il mio nome è Pio Nono
      case match( FIRSTNAME_REGEX ): {

        // store name in a global variable!
        //this.firstName = slots().firstName
        const firstName = setvar('firstName', slots().firstName)

        say(rand(`Davvero ti chiami ${firstName}?|Ti chiami proprio ${firstName}?`))
        
        next(verifyName)
        break
      }

      // balblabla
      default:

        say( rand('non ho capito.|credo di non avere capito.|mmhhh.') )
        say( rand('Come ti chiami?|Qual\'è il tuo nome?') )
        break
    }
  },


  /**
   *
   * subdialog function: 
   *   verifyName
   *
   * type: 
   *   sentence processing
   */
  verifyName(sentence) {

    switch(take(sentence)) {
       
      // si
      case match( /^(si|sì|yes|davvero|veramente|certo)/i ): {
        
        const firstName = getvar('firstName')

        say(`ciao ${firstName}, è un piacere conoscerti.${optional(' Hai un nome molto simpatico!')}`)

        exec(askRestart)
        break
      }
     
      // no 
      case match( /^no/i ):
        
        say('Ma allora come ti chiami?')
        next(presentations)
        break

      // balblabla
      default:
        say('Non ho capito. Come ti chiami?')
        next(presentations)
        break
    }
  }
}  

module.exports = firstUnit
// End dialog

