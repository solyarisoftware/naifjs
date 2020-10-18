# Application examples

Here listed some examples that demonstrate NaifJs features.

Each project directory contains:

- one or more dialog units
- `show`: bash script that show the application info
- `shell`: bash script to run the application, to test it on the command line 


## 1. [examples/getUserName](getUserName)

- The NaifJs *Hello World*
- 1-state dialog
- Get user name and terminate

```
examples/
├── getUserName
│   ├── getUserName.js
│   ├── show
│   └── shell
```

## 2. [examples/getUserNameTimeout](getUserNameTimeout)

- Hello World with timeout
- 1-state dialog 
- Get user name and terminate
- Show how to implement prompt timeout management

```
examples/
├── getUserNameTimeout
│   ├── getUserName.js
│   ├── show
│   └── shell
```

## 3. [examples/story_it](story_it)

- The application is a small part of an interactive storyline, originally made in Italian language
- It's made by 2 interconnected dialog units
- Demonstrate how to link 2 different dialog units
- Show how to set and get a dialog unit variable
- naif shell run with --silent flag

```
examples/
└── story_it
    ├── firstUnit.js
    ├── firstUnit.script
    ├── lib
    │   └── random.js
    ├── README.md
    ├── secondUnit.js
    ├── secondUnit.script
    ├── show
    ├── shell
    └── UNITS.script
```

## 4. [examples/story_en](story_en)

- English version of previous app.

```
examples/
├── story_en
│   ├── firstUnit.js
│   ├── lib
│   │   └── random.js
│   ├── README.md
│   ├── secondUnit.js
│   ├── show
│   └── shell
```

## 5. [examples/textOrSpeech](textOrSpeech)

- The dialog just shell if user spoken or texted, 
  inspecting the speech attribute in the RequestDataObject. 

  > Trick: To simulate a speech input with the command line utility: 
  > `naif test shell`, just input ALL CAPS.

```
examples/
├── textOrSpeech.js
│   ├── show
│   └── shell
```


## 6. [examples/Notify](notify)

- TODO notify user asynchronously 
- Show how to push user with unsolicited messages/dialogues 
- The "dialog", triggered by a cron-based, simply activates the previous example 1 (Hello world). 

```
examples/
├── notify.js
│   ├── show
│   └── shell
```


## 7. [examples/promemoria](promemoria)

- TODO Just a draft script that mimic Google Home reminder dialog.

```
examples/
├── promemoria
│   └── promemoria.script
```
---

[top](#) | [home](../README.md)

