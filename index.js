var assert = require("assert")

/**
 * Main object on which each assertion function is attached to.
 *
 * If you wish to add your own matchers, just add them to `Must.prototype`.
 *
 * @constructor
 * @param {Object} obj The object or value you're asserting.
 */
var Must = module.exports = function(obj) {
  if (!(this instanceof Must)) return new Must(obj)
  this.obj = obj
}

/**
 * Helper to grab the native unboxed value with `valueOf` from a JavaScript
 * object such as `Boolean`, `String` or `Number`. Returns other objects as is.
 *
 * @param {Object} obj The object you wish to unbox.
 */
var unbox = Must.unbox = function(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}

Object.defineProperty(Object.prototype, "must", {
  get: function() { return new Must(this) },

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

Must.prototype = {
  /**
   * Pass-through property for a fluent chain like `true.must.be.true`.
   * Also, can be used as an alias of `equal` with `true.must.be(true)`.
   *
   * @alias equal
   */
  get be() {
    var equal = this.equal.bind(this)
    equal.__proto__ = Must.prototype
    equal.obj = this.obj
    return equal
  }
}

/**
 * Assert object is `true` or `Boolean(true)`.
 */
Must.prototype.true = function() {
  assert.strictEqual(unbox(this.obj), true)
}

/**
 * Assert object is `false` or `Boolean(false)`.
 */
Must.prototype.false = function() {
  assert.strictEqual(unbox(this.obj), false)
}

/**
 * Assert object is `null`.
 */
Must.prototype.null = function() {
  assert.strictEqual(this.obj, null)
}

/**
 * Assert object is `undefined`.
 */
Must.prototype.undefined = function() {
  assert.strictEqual(this.obj, undefined)
}

/**
 * Assert object is truthy (`!!obj`).
 *
 * `0`, `Number(0)`, `false`, `Boolean(false)`, `null`, `""` and `undefined` are
 * falsy in JavaScript.  Everything else is truthy.
 */
Must.prototype.truthy = function() {
  assert(unbox(this.obj))
}

/**
 * Assert object is falsy (`!obj`).
 *
 * `0`, `Number(0)`, `false`, `Boolean(false)`, `null`, `""` and `undefined` are
 * falsy in JavaScript.  Everything else is truthy.
 */
Must.prototype.falsy = function() {
  assert(!unbox(this.obj))
}

/**
 * Alias of `truthy`.
 *
 * @alias truthy
 */
Must.prototype.ok = Must.prototype.truthy 

/**
 * Assert object strict equality and identity (`===`).
 */
Must.prototype.equal = function(expected) {
  assert.strictEqual(unbox(this.obj), expected)
}
