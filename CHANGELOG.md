# Change log

All notable changes to this project will be documented in this file. 

## version 0.46.11

- security update: https://github.com/solyarisoftware/naifjs/security/dependabot/package-lock.json/lodash/open

## Version 0.46.9
- documentation update
- log.js udpated and renamed logdialog.js
- naif init updated: basic generic main template improved

## Version 0.46.6 - first public version
- added documentation doc/index.md 
- moved request logic from lib/engine.js to lib/request.js 
- added `naif init`

## Version 0.45.1
- doc rework: concepts are moved from README.md  to doc/consepts.md
- code rework: varaibles functions moved from lib/engine.js to lib/variables.js

## Version 0.45.0
- code rework: response functions moved from lib/engine.js to lib/response.js
- examples bash scripts renamed from `test` to `shell` 
- documenattion: doc/sessions.md better explanation of session thread 
- command line tools help improved 
- documentation: READMe.md revisited

## Version 0.44.0
- session data format is changed
  - time is now in msecs
  - variables in "variables" object
  - request data added
  - response data added
  - validateRequest add time attribute
  - validateResponse add time attribute

## Version 0.43.7
- story_it / story_en updated to show how to get variable from another dialog unit. 
- Documentation updated (examples, variables, etc.)
- log.js file reviewed. 
- color.js created
- devlog.js created, to manage developers error (stderr)

## Version 0.43.0
- `naif shell` now show stated when `ENTER` is pressed 
- `naif shell` now has -s / --silent flag 
- Log are removed from the engine; `naif.up` no more take log file as argument
- ResponseDataObject now has the attribute stateid
- `naif test` and `naif telegram` implement logs dialogs using lib/log.js
- /home/giorgio/naifjs/bin/lib/getArgs.js bug fixed 
- Documentation updated

## Version 0.42.0
- Documentation updated
- `request` logic improved. Now each input state receive the RequestDataObject
- Added API `toText(RequestDataObject)` 
- Added the example application `textOrSpeech` to show how to use RequestDataObject

## Version 0.41.12
- Documentation updated
- `naif` now has  a better cli, using subcommands

## Version 0.41.6
- response now has two function decorators: 
  - `say` for response not requiring user turn 
  - `ask` API  to manage questions with timeout. 
- Documentation updated
- timeout default enabled

## Version 0.41.2
- fixed bug in postinstall. 
- timeout logic has been moved from lib/engine.js to lib/timeouts.js. 
- id moved in lib/sessionid.js. 
- userid renamed in lib/sessions.js, lib/engine.js. 
- Documentation updated. 

## Version 0.41.0 
- timeout logic revisited: now user can configure timeout msecs with freedom 
- `bin` directory now contains just binaries. All `naif` subcommands are moved to the `bin/lib` subdirectory.
- figure 1 image updated.
- Documentation updated. 

## Version 0.40.0 
- `tag` function has been renamed `stateid`
- Documentation updated. 

## Version 0.39.0 
- `Request`  and `Response` now take a validated data object
- Documentation updated. 

## Version 0.38.1 
- Documentation updated. 
- Added screenshots in cli doc. 

## Version 0.37.1 
- Documentation updated. Added introduction and figure 1. 
- sessions storage revised: now the session file id created by defualt in the application directory.
- `naif telegram` updated with chatids management: 
  the telegram bot run a dialog and optionally activate the dialog (push mode) prompting specified chat ids.

## Version 0.36.0 
- Added a command line entry point: `naif telegram`.
- `run` statement now renamend `request`. 
- `say` statement now renamend `response`. 
- Documentation updated. 

## Version 0.34.0 
- Documentation updated. 
- lib/unitsLoader.js renamed and reviewed.
- lib/patternsMatchRegexp.js updated with some tests.
- lib/buildTags.js splitted out from lib/engine.js.
- Examples directory fully updated.
- Added a command line entry point: `naif show`.
- command line entry point: `naif cli` has been renamed `naif test`.

## Version 0.29.0 
- Added a single command line entry point: `naif`.

## Version 0.28.6 
 added script directory, containing scripts to run examples.

## Version 0.28.5 
- temporary public initial commit.

---

[top](#) | [home](../README.md)

