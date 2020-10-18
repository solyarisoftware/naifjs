# NaifJs API cheat sheet 

 ⚠️  To be completed. 

## Up API (by caller program)

```javascript
up(unitsFolder, replyCallback, endCallback, sessionsFilename, aLogFilename, verbose)
```
Start the run-time engine.


```javascript
start(sessionid, stateid, argument)
```
Invoke a dialog unit initial state.


```javascript
request(sessionid, sentence, asr)
```
Run the engine, processing the user utterance.


```javascript
down()
```
Stop the run-time engine.

```javascript
isSessionActive(sessionid)
```
there is a dialog running for current id?
Alias: `isDialogActive`

```javascript
setDefaultTimeoutTime(timeMsec)
```
Set the default timeout in msecs.


## Down API 

Dialog unit Domain Specific Language (DSL)

The table here below summarize all *statements* (function) that developer can use to build in a dialog:


### State Transition

```javascript
exec(stateid, sessionid=id, argument)
```
Transact to an output state.
Aliases: `goout`, `setOutputState`, `gotoOutputState`, `nextOutputState`

```javascript
next(stateid, sessionid=id)
```
Transact to an input state.
Aliases: `goto`, `setInputState`, `gotoInputState`, `nextInputState`

```javascript
end(sessionid=id)
```
End the dialog session.


### Response Messages

```javascript
response(data, timeoutDescriptor, sessionid)
```
Send a response to the user.
Aliases: `reply`

```javascript
say(data, sessionid)
```
simple statement (noi-wait response).

```javascript
ask(data, timeoutDescriptor, sessionid)
```
response that wait feedback from the user.


### Response prompt timeouts management

```javascript
startTimeout(callback, milliseconds, params, sessionid=id)
```
Start a timeout handler.

```javascript
stopTimeout(sessionid)
```
Stop the timeout handler.

```javascript
getCounterTimeout(sessionid)
```
How many timeout are run?


### State Machine Status

```javascript
stateid()
```
Return the current state reference (the *stateid*).
Aliases: `currentState`

```javascript
chatid()
```
Get the current chat id.

```javascript
setChat(sessionid)
```
Set the current chat id.

```javascript
buildTags(unitStatesObj, unitName)
```
Return an object containing all dialog unit stateids.


### Pattern Matching

```javascript
take(sentence)
```
Save the pattern match info.

```javascript
match(regex)
```
Match a pattern/intent.

```javascript
equal(text)
```
Match sentence with a precise text.

```javascript
slots()
```
Return the slots of a pattern matched.
Aliases: `entities`


### Dialog Unit Variables

```javascript
setvar(name, value, unitid=unit, sessionid=id)
```
Write a dialog unit variable on the session storage.

```javascript
getvar(name, unitid=unit, sessionid=id)
```
Read a dialog unit variable on the session storage.

```javascript
delvar(name, unitid=unit, sessionid=id)
```
Delete a dialog unit variable on the session storage.

```javascript
delvars(unitid=unit, sessionid=id)
```
Delete all dialog unit variables on the session storage.

---

[top](#) | [home](../README.md) | [index](index.md)
