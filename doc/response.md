# `Response` message data

The main program has to supply a `response` callback to send the message to the channel 
(see the Telegram bot pseudo-code example here above).

The `response` output message (reply to user) payload can be:

- a flat text 

  ```javascript
  /* @param {string} text ResponseDataObject */
  ```

- a specific javascript object data structure:

  ```javascript
  /* @param {{text: string, speech: boolean, wait: boolean, optionalAttr: ..., optionalAttr: ...}} RequestDataObject */
  ```

Here below some examples with different kind of `response` data payloads:

- text only output:

  ```javascript
  naif.response( sessionid, { text: 'my name is Giorgio Robino' } )
  ```

- speech with text caption:

  ```javascript
  naif.response( sessionid, { text: 'my name is Giorgio Robino', speech: true, caption: 'my name is Giorgio Robino' } )
  ```

- image with text caption and voice over:

  ```javascript
  naif.response( sessionid, { 
    image: 'path/to/image.jpg', 
    text: 'my name is Giorgio Robino', 
    speech: true, 
    caption: 'my name is Giorgio Robino' 
  } )
  ```

- audio file or [earcon](https://en.wikipedia.org/wiki/Earcon):

  ```javascript
  naif.response(sessionid, { audio: 'path/to/audio_recording.ogg', text: false, } )
  naif.response(sessionid, { earcon: 'path/to/some_earcon.ogg', text: false, } )
  ```

There are two types of responses:

- `say` (no-wait statement)
 
  The agent response doesn't require a turn-taking; the user may not interact anymore.

  ```javascript
  say( 'Hello! Today is sunny, with a temperature of 15 degrees' )
  ```

- `ask` (wait prompt) 
 
  The response is a prompt that requires an user feedback.
  In other words, the agent ask a question to the user.

  For a response question, NaifJs add the flag `wait` in the data object,
  for any further usage by the external message channel adapter. 

  By example, if the channel would be a smart-speaker, 
  the device adapter could visualize some light or an earcon, 
  indicating that the dialog system is waiting a feedback from the user. 

  ```javascript
  ask( 'What\'s your name?' )
  ```
  in this case the string argument is transformed internally as:

  ```javascript
  ask( { test: 'What\'s your name?', wait: true } )
  ```


## Prompt callbacks (no-speech timeouts)

A dialog agent prompt to user with a `response` API statement. 
By default there is no timeout management: 

```javascript
say( 'Hello! What\'s your name?' )
```

> ⚠️ In the case above the dialog is stuck, 
> because the system is waiting indefinitely a reply from the user.
> That's ok in case of a collaborative user but 
> allowing that the dialog hung waiting a user feedback is a bad practice and it could be avoided.

NaifJs is able to manage the user silence (no-speech) after a prompt.
This is done passing an optional callback function 
that is triggered after a specified number of milliseconds/seconds:

```javascript
response( 'Hello! What\'s your name?', askNameTimeout )
```

It's also possible to specify an object to the `response` function:

```javascript
response( 'Hello! What\'s your name?', { callback: askNameTimeout, milliseconds: 15000 } )
```


The timeout callback is triggered after a certain number of specified milliseconds 
and usually it just reprompt the user. 
In the example here below, the application timeout handler reprompt twice, afterward give-up. 

```javascript
// output state handler, dialog entry point (start) 
function askName() {
    
  ask( 'Hello! What\'s your name?', askNameTimeoutCallback )

  next(getNameState)
}

// input state handler 
function getName(sentence) {

  // create a regexp rule to get a first name (e.g. Anna Lisa, Giorgio La Malfa)
  const firstNameReg = '(?<firstName>[A-Z][a-z]{1,}(\\s[A-Z][a-z]{1,})*)'
  const introNameReg = '^(my name is |name me |I\'m )?'
  const FIRSTNAME_REGEX = new RegExp ( introNameReg + firstNameReg ) 

  // the function askNameTimeout is called 15 secs after the say statement 
  const timeout = { callback: askNameTimeout, milliseconds: (15 * 1000) }

  switch ( take(sentence) ) {
 
    // pattern 1
    case match( /hi|hello|good morning|good afternoon/i ):
      
      ask( 'Hi there! What\'s your name?', timeout )
      break

    // pattern 2
    case match( FIRSTNAME_REGEX ):

      say( `Nice to meet you, ${slots().firstName}!` )
      end()
      break

    // fallback pattern
    default:

      say( 'I do not understand.' )
      ask( 'What is your name?', timeout )
      break
  }
}


/**
 * ask name timeout handler
 *
 * @param {string} user id
 * @param {Object} params
 */ 
function askNameTimeoutCallback(userid, params) {

  setChat(userid)

  switch( getCounterTimeout() ) {

    case 1:
      // first timeout goes off
      ask( 'What\'s your name?' )

      // reschedule a timeout in 30 seconds
      startTimeout( askNameTimeout, 30000 )
      break

    case 2:
      // second timeout
      ask( 'Are you there? Please tell me what is your name' )

      // reschedule a timeout in 60 seconds
      startTimeout( askNameTimeout, 60000 )
      break

    case 3:
      // third timeout: close the conversation
      stopTimeout()
      end()
   }   
 }   
```

The running example is the [here](../examples/getUserNameTimeout/getUserName.js).


## Reprompt policy 

NaifJs gives developer full control to decide what to do when timeout is up.

In the example above the user is re-prompted twice, 
he's asked to reply, afterward  the dialogue end.
This is an arbitrary policy that developer decides. 

Another option could be to let the dialog move to another state, 
maybe reformulating the question or moving to another topic.

---

[top](#) | [back](requestresponse.md) | [home](../README.md) | [index](index.md)
