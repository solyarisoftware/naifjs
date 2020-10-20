# NaifJs, a simple state-machine based dialog manager

NaifJs is a simple state-machine based (task-oriented) 
dialog manager micro-framework for nodejs developers.

The project consists in: 
- A run-time dialog manager, 
  as a module to be embedded as part of a container dialog system
- A micro-framework development environment 
  (`naif` command line program) to create and quickly test dialogues.


## [Concepts](doc/concepts.md)

Naifjs is based on a specific conceptual model and a domain specific language (DSL) I conceived,
implementing multi-turn contextual dialogues as "state machines", graphs of internal states. 

Following paragraph introduces main concepts and naming conventions.
I define what is a dialog system, a dialog manager, a single dialog unit, the end multi-dialog application:

- Dialog system
  - [Stateful multi-turn dialogues](doc/concepts.md#introduction--stateful-multi-turn-dialogues)
  - [Architecture](doc/concepts.md#architecture)

- State-machine based dialog manager 
  - [Dialogue as a state-machine](doc/concepts.md#dialogue-as-a-state-machine)
  - [State tracker](doc/concepts.md#state-tracker)

- What is a dialog unit
  - [Dialog Unit](doc/concepts.md#dialog-unit)
  - [Coding a dialogue with a javascript domain specific language](doc/concepts.md#coding-a-dialogue-with-a-javascript-domain-specific-language)
  - [Requests and responses](doc/concepts.md#requests-and-responses)

- Application 
  - [Dialog application](doc/concepts.md#dialog-application)
  - [Sessions](doc/sessions.md)

The full documentation is available [here](doc/index.md).


## Installation

The package contains command line interface program `naif`, so you must install the npm package as global:

- use npm package manager repo

  ```
  $ npm install -g naifjs
  ```

- or download this github repo:

  ```
  $ git clone https://github.com/solyarisoftware/naifjs
  $ cd naifjs && npm link
  ``` 

## Application Programming interface and command line micro-framework 


### [API library](doc/API.md)

NaifJs act as an API library of functions to be called by a main nodejs program. 
See: 

- [API cheat sheet](doc/API.md): list of available functions 
- [Application examples](examples/README.md) some application examples 
- [Documentation content index](doc/index.md) some application examples 
- [Workflow](doc/workflow.md) design/development phases 


### [Command line micro-framework](doc/naif.md)

The NaifJs API are foundation for a micro-framework development environment 
(the `naif` command line program) to create the end application, generate dialog units skeleton code and quickly test dialogues:

- [`naif`](doc/naif.md) is the main command line program 
- [`naif init`](doc/naif-init.md) initializes project directory 
- [`naif generate`](doc/naif-generate.md) generate the code skeleton of a dialog unit 
- [`naif show`](doc/naif-show.md) for a given project, lists all dialog units and relative states 
- [`naif shell`](doc/naif-shell.md) test a dialog unit using the command line interface 
- [`naif telegram`](doc/naif-telegram.md) test a dialog unit, setting up on the fly a telegram bot for the purpose


## Discussion / How to contribute

- [Pros and cons](doc/discussion.md#pros-and-cons)
- [Food for thought](doc/discussion.md#food-for-thought)
- [BackStory](doc/discussion.md#backstory)
- [Acknowledgments](doc/discussion.md#acknowledgments)
- [How to contribute](doc/contributing.md).<br>
- [To do](doc/todo.md)


## License 

[MIT](LICENSE.md) (c) Giorgio Robino

---

[top](#) | [index](doc/index.md)

