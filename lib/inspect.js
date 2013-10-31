var kindof = require("kindof")

module.exports = function(obj) {
  var root = obj

  switch (kindof(obj)) {
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
