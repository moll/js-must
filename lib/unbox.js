module.exports = function(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}
