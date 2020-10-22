# Dialog application

In NaifJs, a *dialogue application*, or *project* is made by: 
- a main program containing the invocation logic of *dialog units*.
- a set of dialogue units files, 
  currently contained in a single specified directory, 
  implementing all workflows of a specific application. 

At run time all dialog files of the directory are loaded into the NaifJs engine, 
through function `up`:

```javascript
// index.js
const naif = require('naifjs')
const DIALOGS_DIRECTORY = './units'
naif.up(DIALOGS_DIRECTORY, responseCallback)
naif.start('firstUnit.start')
```

The application main program invokes the node `start` of dialog unit `firstUnit.naif.js`. 
Afterward the user will traverses the state machine graph, 
maybe passing from dialogue unit `firstUnit.naif.js` to dialogue unit `secondUnit.naif.js`.

```
path/to/myApplication
├── index.js 
└── units 
  ├── firstUnit.naif.js
  └─── secondUnit.naif.js
```

> In general, an application could be considered as a container of one or multiple dialogue units (micro-skills),
> each implementing a single self-consistent workflow.


## A minimal application example (Telegram Bot) 

The example here below implement a simple Telegram chatbot that invoke the dialogue 'greetings', 
when the user say the *activation sentence*: `greetings`. 

The invocation sentence is captured by a regexp that optionally catch also a parameter (slot) 
passed to the dialogue entry function handler. 

```javascript
const TelegramBot = require('node-telegram-bot-api')
const naif = require('naifjs')

const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', {polling: true})

// directory containing all dialog-units
const PROJECT_DIRECTORY = './greetings'

const GREETINGS_INVOCATION_REGEXP = /^greetings\s*(.+)*$/i 
const GREETINGS_DIALOG_ENTRY = 'getUserName.askName'

naif.up(PROJECT_DIRECTORY, bot.sendMessage)

// process any incoming message
bot.on('message', msg => {

  let match

  const userId = msg.chat.id
  const userSentence = msg.text

// There is a dialogue already active for the user?
if ( naif.isSessionActive(userId) )
  naif.request(userId, userSentence)

// dialog-unit start when the invocation sentence is matched
if ( (match = userSentence.match(GREETINGS_INVOCATION_REGEXP)) )
  naif.start(userId, GREETINGS_DIALOG_ENTRY, match[1])

// fallback answer
bot.sendMessage(userId, 'Sorry, I do not understand.') 
})

process.on('SIGTERM', naif.down())
```


## [Requests and responses](requestresponse.md)

NaifJs interact with user receiving and sending messages. 
The platform is agnostic regarding media contents in `request` and `response` messages. 
> 👉 All details [here](requestresponse.md).


## [Sessions](sessions.md)

NaifJs is a multi-user dialogue manager. 

Even if running as an embedded library, the engine can be used as a "server" 
that manage dialogues by many *user ids*, in parallel. 
> 👉 More details [here](sessions.md).


## [Project examples](../examples)

You can explore a bunch of NaifJs dialog unit examples [here](../examples).

---

[top](#) | [home](../README.md) | [index](index.md)
