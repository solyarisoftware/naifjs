function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]'
}


module.exports = { isString }
