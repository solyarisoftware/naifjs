# `Request` message data 

Using NaifJs, the main node program is in charge to convert each incoming message from the channel, 
calling the dialog manager with `request` API.

NaifJs accepts requests data payload can be:

- flat text 

  ```javascript
  /* @param {string} text RequestDataObject */
  ```

- a javascript object data structure

  ```javascript
  /* @param {{text: string, speech: boolean, optionalAttr: ..., optionalAttr: ...}} RequestDataObject */
  ```

  containing at least a `text` attribute,(denoting a user written utterance), 
  a `speech` attribute, denoting that user spoken the utterance, 
  and more arbitrary optional parameters.

Request examples:

- Text (written input), where data payload is a string:

  ```javascript
  naif.request( sessionid, 'my name is Giorgio Robino' )
  ```

- Text (written input), where data payload is an object:

  ```javascript
  naif.request( sessionid, { text: 'my name is Giorgio Robino' } )
  ```

- Speech (the transcript from a speech-to-text engine):

  ```javascript
  naif.request( sessionid, { text: 'my name is Giorgio Robino', speech: true } )
  ```

- Audio message (whitout speech):

  ```javascript
  naif.request( sessionid, { audio: 'input_audio.ogg', text: '', speech: false } )
  ```

- Image (where text attribute is maybe the transcript from a speech-to-text engine):

  ```javascript
  naif.request( sessionid, { image: 'input_image.jpg', text: 'my name is Giorgio Robino', speech: true } )
  ```

- Video message (where text attribute is maybe the transcript from a speech-to-text engine):

  ```javascript
  naif.request( sessionid, { video: 'input_video.mp4', text: 'my name is Giorgio Robino', speech: true } )
  ```


Notes:

- The requestDataObject is passed as argument to each input state function. 
  That allows the handler to manage any kind of request data, not just texts.

- The example [textOrSpeech](../examples/textOrSpeech) show how to use the data object 
  to differentiate a spoken or texted input 

- the function API `toText(RequestDataObject)` return the text attribute of the request.


---

[top](#) | [back](requestresponse.md) | [home](../README.md) | [index](index.md)
