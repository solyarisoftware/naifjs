# Tutorial - Dialog Development Workflow

 ⚠️  To be completed.

## Design, Development, Debug    

- Designing a dialog script/workflow.
  In examples directory [story_it](../examples/story_it/) you can find simple scripts the I used to design a simple interactive story: 
  [firstUnit.script](../examples/story_it/firstUnit.script) and [firstUnit.script](../examples/story_it/firstUnit.script)

- Build the state-machine code. 
  The dialog is modeled as a state machine, in terms of input/output nodes interconnected in a graph.
- Developer can generate the skeleton of a code using [`naif new`](doc/cli.md#naif-new) command line utility.
- Developer write the dialog javascript code "hard-coding" prompts and logic in each state using NaifJs DSL API.
- Resulting dialog may be tested using the [`naif test`](doc/naiftest.md) command line utility (recommended).

## Run-time Embedding

- Start NaifJs run-time engine in your main program and pass user sentences to the engine with `request` primitive.
- Dialog is invoked with an invocation sentence (see the Telegram bot pseudocode example here above).

---

[top](#) | [home](../README.md) | [index](index.md)

