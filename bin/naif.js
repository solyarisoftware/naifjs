#!/usr/bin/env node

const { info } = require('./lib/info')
const { getArgs } = require('./lib/getArgs')
const { naifinit } = require('./lib/naif_init')
const { naifshell } = require('./lib/naif_shell')
const { naifshow } = require('./lib/naif_show')
const { naifnew } = require('./lib/naif_new')
const { naiftgbot } = require('./lib/naif_telegram')

// get command line args and commands
const { args, commands } = getArgs()

const command = commands[0] ? commands[0].toLowerCase() : undefined
const subCommand = commands[1] ? commands[1].toLowerCase() : undefined

switch ( command ) {

  // naif init
  case 'init':
    naifinit( args )
    break

  // naif generate
  case 'generate':
    naifnew( args )
    break

  // naif show
  case 'show':
    naifshow( args )
    break

  // naif shell
  case 'shell':
    naifshell( args )
    break

  // naif telegram
  case 'telegram':
    naiftgbot( args )
    break

  // naif test shell
  // naif test telegram 
  case 'test': {
    switch ( subCommand ) {
      case 'shell':
        naifshell( args )
      break

      case 'telegram':
        naiftgbot( args )
        break

      default:
        console.log( info() )
        break
    }  
    break
  }  

  // naif new dialog
  // naif new project
  case 'new':
    switch ( subCommand ) {
      case 'dialog':
      case 'unit':
        naifnew( args )
      break

      case 'app':
      case 'project':
        console.log( info() )
        break

      default:
        console.log( info() )
        break
    }  
    break

  case 'help':
  case 'info':
    console.log( info() )
    break

  default:
    console.log( info() )
    break

}

