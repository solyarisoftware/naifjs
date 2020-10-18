const {say, next, exec, end, match, take, getvar} = require('../../')

//
// dialogs tag shortcuts
//
const restart = 'secondUnit.restart'
const dogIntroduction = 'firstUnit.dogIntroduction'

const secondUnit = {
  
  /**
   * askRestart
   * output state function
   */
  askRestart() {
    say('Do you want to restart?')
    next(restart)
  },

  /**
   * verifyName
   * input state function
   *
   * @param {requestDataObject} request
   *
   */
  restart(request) {

    switch(take(request)) {
       
      // yes
      case match( /^(yes|ok|true|right|correct|sure)/i ): 
         
        exec(dogIntroduction)
        break

      // no 
      case match( /^no/i ):
        
        // terminate the dialog
        // get a variable from another unit
        say(`See you again ${getvar('firstName', 'firstUnit')}!`)
        end() 
        break
     
      // balblabla
      default:

        say('I do not understand.')
        say('Do you want to restart?')
        next(restart)
        break
    }
  }
}  

module.exports = secondUnit

