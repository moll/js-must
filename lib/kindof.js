var unbox = require("./unbox")

module.exports = function kindof(obj) {
  if (obj === null) return "null"
  if (obj instanceof Date) return "date"
  if (obj instanceof RegExp) return "regexp"
  if (Array.isArray(obj)) return "array"
  return typeof unbox(obj)
}
