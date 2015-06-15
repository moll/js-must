var clone = require("oolong").clone
var kindof = require("kindof")

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
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    case "object":
      obj = clone(obj)
      if (root instanceof Error) obj.message = root.message
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

var setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  obj.__proto__ = prototype
  return obj
}
