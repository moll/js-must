var kindof = require("kindof")
var jsonify = require("json-stringify-safe")
var setPrototypeOf = require("./es6").setPrototypeOf
var INDENT = null

exports.chain = function(self, fn) {
  if (typeof fn != "function") throw new TypeError("Not a function: " + fn)

  // Don't set toString as it seems to break "source-map-support". This is
  // a function with an Object prototype, after all.
  return Object.defineProperties(setPrototypeOf(fn.bind(self), self), {
    bind: {value: Function.prototype.apply, configurable: true, writable: true},
    call: {value: Function.prototype.apply, configurable: true, writable: true},
    apply: {value: Function.prototype.apply, configurable: true, writable: true}
  })
}

exports.stringify = function stringify(obj) {
  var root = obj

  switch (kindof(obj)) {
    // Allow falling through:
    /* jshint -W086 */
    /* eslint no-fallthrough: 0 */
    case "null": return "null"
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "string": return JSON.stringify(obj)
    case "symbol": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    case "object":
      obj = clone(obj)
      if (root instanceof Error) obj.message = root.message
      // Fall through.

    default: return jsonify(obj, stringifyValue, INDENT)
  }
}

function clone(obj) {
  var clone = {}, value
  for (var key in obj) clone[key] = (value = obj[key]) === obj ? clone : value
  return clone
}

function stringifyValue(key, value) {
  switch (kindof(value)) {
    case "undefined": return "[Undefined]"
    case "number": return isNaN(value) ? "[NaN]" : value
    case "symbol": return value.toString()
    case "regexp": return value.toString()
    default: return value
  }
}
