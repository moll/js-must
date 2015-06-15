exports.endsWith = String.prototype.endsWith ?
  Function.call.bind(String.prototype.endsWith) :
  function(haystack, needle) {
  return haystack.indexOf(needle, haystack.length - needle.length) >= 0
}
