var Assertions = require("./lib/assertions")
var AssertionError = require("./lib/assertion_error")
var unbox = require("./lib/unbox")
module.exports = Must

/**
 * Main object on which each assertion function is attached to.
 *
 * If you wish to add your own matchers, just add them to `Must.prototype`.
 *
 * @class Must
 * @constructor
 * @param obj The object or value you're asserting.
 */
function Must(actual) {
  if (!(this instanceof Must)) return new Must(actual)
  this.actual = actual
}

Must.prototype = Assertions

Object.defineProperty(Must.prototype, "constructor", {
  value: Must,
  writable: true,
  configurable: true
})

Must.AssertionError = AssertionError

Object.defineProperty(Object.prototype, "must", {
  get: function() { return new Must(unbox(this)) },

  set: function(value) {
    Object.defineProperty(this, "must", {
      value: value,
      configurable: true,
      enumrable: true,
      writable: true
    })
  },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})
