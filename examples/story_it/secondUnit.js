const {say, next, exec, end, match, take, getvar} = require('../../')

// dialogs tag shortcuts
const restart = 'secondUnit.restart'
const dogIntroduction = 'firstUnit.dogIntroduction'

const secondUnit = {
  
  /**
   * askRestart
   * startup ioutput state function
   */
  askRestart() {
    say('vuoi ricominciare?')
    next(restart)
  },

  /**
   * verifyName
   * input state function
   *
   * @param {requestDataObject} request
   */
  restart(request) {

    switch(take(request)) {
       
      // sì
      case match( /^(si|sì)/i ):
         
        exec(dogIntroduction)
        break

      // no 
      case match( /^no/i ):
        
        // terminate the dialog
        // get a variable from another unit
        say(`Arrivederci ${getvar('firstName', 'firstUnit')}!`)
        end() 
        break
     
      // balblabla
      default:

        say('Non ho capito.')
        say('vuoi ricominciare?')
        next(restart)
        break
    }
  }
}  

module.exports = secondUnit

