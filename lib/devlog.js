
/**
 * console error 
 * @private
 */
function error(text) {
  console.error( 'ERROR: ' + text)
}


/**
 * console warning 
 * @private
 */
function warning(text) {
  console.error( 'WARNING: ' + text)
}


/**
 * console info 
 * @private
 */
function info(text) {
  console.info( 'INFO: ' + text)
}



/**
 * for unit test
 * @private
 */
function main() {

  error('this is an error. It\'s printed on stderr')
  warning('this is a warning. It\'s printed to stderr')
  info('this is an info. It\'s printed to stdout')

}

// Detect if called through require or directly by command line
// https://stackoverflow.com/a/6398335/1786393
if (require.main === module) 
  main()

module.exports = { warning, error, info } 

