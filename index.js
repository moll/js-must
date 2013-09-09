var unbox = require("./lib/unbox")

/**
 * Main object on which each assertion function is attached to.
 *
 * If you wish to add your own matchers, just add them to `Must.prototype`.
 *
 * @class Must
 * @constructor
 * @param obj The object or value you're asserting.
 */
var Must = module.exports = function(actual) {
  if (!(this instanceof Must)) return new Must(actual)
  this.actual = actual
}

// Export Must before requiring assertions, because assertions atm. reference
// Must for cloning.
Must.prototype = require("./lib/assertions")
Must.AssertionError = require("./lib/assertion_error")

Object.defineProperty(Object.prototype, "must", {
  get: function() { return new Must(unbox(this)) },

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
