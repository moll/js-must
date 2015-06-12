var kindof = require("kindof")

exports.defineGetter = function(obj, name, get) {
  Object.defineProperty(obj, name, {
    get: get, configurable: true, enumerable: true
  })
}

exports.lookupGetter = function(obj, name) {
  return Object.getOwnPropertyDescriptor(obj, name).get
}

exports.chain = function(fn) {
  if (typeof fn != "function") throw new TypeError("Not a function: " + fn)

  return function() {
    var assert = fn.bind(this)
    assert.apply = fn.apply
    assert.bind = fn.bind
    assert.call = fn.call
    assert.toString = fn.toString
    setPrototypeOf(assert, this)
    return assert
  }
}

exports.inspect = function(obj) {
  var root = obj

  switch (kindof(obj)) {
    // Allow falling through:
    /* jshint -W086 */
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    case "object":
      obj = flatten(obj)
      // Fall through.

    default:
      var stack = []
      return JSON.stringify(obj, function(key, value) {
        if (!stack.length) return stack.push(value), value

        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)

        if (value === root || ~stack.indexOf(value)) return "[Circular]"
        return value === undefined ? "[Undefined]" : value
      })
  }
}

function flatten(obj) {
  var flat = {}
  for (var key in obj) flat[key] = obj[key]
  return flat
}

var setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  obj.__proto__ = prototype
  return obj
}
