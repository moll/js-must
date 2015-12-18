var kindof = require("kindof")
var jsonify = require("json-stringify-safe")
var INDENT = null
var setPrototypeOf

exports.chain = function(self, fn) {
  if (typeof fn != "function") throw new TypeError("Not a function: " + fn)

  var assert = fn.bind(self)
  assert.apply = fn.apply
  assert.bind = fn.bind
  assert.call = fn.call
  assert.toString = fn.toString
  setPrototypeOf(assert, self)

  return assert
}

exports.stringify = function(obj) {
  var root = obj

  switch (kindof(obj)) {
    // Allow falling through:
    /* jshint -W086 */
    /* eslint no-fallthrough: 0 */
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()
    case "symbol": return obj.toString()

    case "object":
      obj = clone(obj)
      if (root instanceof Error) obj.message = root.message
      // Fall through.

    default:
      return jsonify(obj, function(key, value) {
        return value === undefined ? "[Undefined]" : value
      }, INDENT)
  }
}

setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  /* eslint no-proto: 0 */
  obj.__proto__ = prototype
  return obj
}

function clone(obj) {
  var clone = {}, value
  for (var key in obj) clone[key] = (value = obj[key]) === obj ? clone : value
  return clone
}
