var assert = require("assert")

exports = module.exports = function(obj) {
  if (!(this instanceof exports)) return new exports(obj)
  this.obj = obj
}

Object.defineProperty(Object.prototype, "must", {
  get: function() { return new exports(this) },

  set: function(value) {
    Object.defineProperty(this, "must", {
      value: value,
      writable: true,
      configurable: true,
      enumrable: true
    })
  },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})

exports.prototype = {
  get be() {
    var equal = this.equal.bind(this)
    equal.__proto__ = exports.prototype
    equal.obj = this.obj
    return equal
  }
}

exports.prototype.true = function() {
  assert.strictEqual(unbox(this.obj), true)
}

exports.prototype.false = function() {
  assert.strictEqual(unbox(this.obj), false)
}

exports.prototype.equal = function(expected) {
  assert.strictEqual(unbox(this.obj), expected)
}

function unbox(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}
