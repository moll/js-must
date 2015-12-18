exports.setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  /* eslint no-proto: 0 */
  obj.__proto__ = prototype
  return obj
}

exports.startsWith = String.prototype.startsWith ?
  Function.call.bind(String.prototype.startsWith) :
  function(haystack, needle) {
  return haystack.lastIndexOf(needle, 0) === 0
}

exports.endsWith = String.prototype.endsWith ?
  Function.call.bind(String.prototype.endsWith) :
  function(haystack, needle) {
  return haystack.indexOf(needle, haystack.length - needle.length) >= 0
}
