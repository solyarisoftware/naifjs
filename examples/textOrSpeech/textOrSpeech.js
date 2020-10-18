/**
 * dialog unit: textOrSpeech
 * 
 * The dialog just test if user spoken or texted, 
 * inspecting the speech attribute in the RequestDataObject. 
 *
 * Trick: To simulate a speech input with command line utility: 
 *   naif test shell
 *
 * just input ALL CAPS
 * 
 *
 * askName: 
 *   is the (output state) entry point of the dialog 
 *
 * getSentence: 
 *   is the input state that elaborate the user sentence
 *   when the user reply anything, the dialog end
 *
 */

// get naif dialog manager DSL statements
const { say, next, end  } = require('../../')

// define states of current dialog unit 
const textOrSpeech = { askSentence, getSentence }

// defines tags
//const askNameState = 'textOrSpeech.askSentence'
const getSentenceState = 'textOrSpeech.getSentence'

/**
 * askSentence
 * output state handler, dialog entry point (start) 
 */
function askSentence() {
    
  say( 'Hello!' )
  say( 'Tell me anything, speaking or writing' )

  next(getSentenceState)
}


/**
 * getSentence
 * input state handler 
 *
 * @param {requestDataObject} request
 *
 */
function getSentence(request) {

  if ( request.speech ) {
    //
    // end-user spoken -> reply with a speech and a text
    //
    say( { text: 'Ah! you spoken! I\'m happy your are speaking with your voice.', speech: true } )
    say( `BTW, What do you mean with '${request.text.toLowerCase()}' ?` )
  }  
  else  {
    //
    // end-user texted -> reply with just text
    //
    say( 'Ah! You texted! I\'m happy yo enjoy writing.' )
    say( `BTW, What do you mean with '${request.text}' ?` )
  }

  say( 'Never minds. See you later.' )
  end()

}

module.exports = textOrSpeech 

