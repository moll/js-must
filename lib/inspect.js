var kindof = require("kindof")

module.exports = function(obj) {
  switch (kindof(obj)) {
    case "undefined": return "undefined"
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    default:
      var stack = []
      return JSON.stringify(obj, function(key, value) {
        if (!stack.length) return stack.push(value), value

        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)

        if (~stack.indexOf(value)) return "[Circular]"
        return value === undefined ? "[Undefined]" : value
      })
  }
}
