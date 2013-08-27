var assert = require("assert")

/**
 * Main object on which each assertion function is attached to.
 *
 * If you wish to add your own matchers, just add them to `Must.prototype`.
 *
 * @class Must
 * @constructor
 * @param obj The object or value you're asserting.
 */
var Must = module.exports = function(obj) {
  if (!(this instanceof Must)) return new Must(obj)
  this.obj = obj
}

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

Must.prototype = {
  /**
   * Pass-through property for a fluent chain like `true.must.be.true`.
   * Also, can be used as an alias of `equal` with `true.must.be(true)`.
   *
   * @method be
   */
  get be() {
    var equal = this.equal.bind(this)
    equal.__proto__ = Must.prototype
    equal.obj = this.obj
    return equal
  }
}

/**
 * Assert object is `true` or `new Boolean(true)`.
 *
 * @method true
 */
Must.prototype.true = function() {
  assert.strictEqual(this.obj, true)
}

/**
 * Assert object is `false` or `new Boolean(false)`.
 *
 * @method false
 */
Must.prototype.false = function() {
  assert.strictEqual(this.obj, false)
}

/**
 * Assert object is `null`.
 *
 * @method null
 */
Must.prototype.null = function() {
  assert.strictEqual(this.obj, null)
}

/**
 * Assert object is `undefined`.
 *
 * @method undefined
 */
Must.prototype.undefined = function() {
  assert.strictEqual(this.obj, undefined)
}

/**
 * Assert object is truthy (`!!obj`).
 *
 * `0`, `Number(0)`, `false`, `new Boolean(false)`, `null`, `""` and
 * `undefined` are falsy in JavaScript.  Everything else is truthy.
 *
 * @method truthy
 */
Must.prototype.truthy = function() {
  assert(this.obj)
}

/**
 * Assert object is falsy (`!obj`).
 *
 * `0`, `new Number(0)`, `false`, `new Boolean(false)`, `null`, `""` and
 * `undefined` are falsy in JavaScript.  Everything else is truthy.
 *
 * @method falsy
 */
Must.prototype.falsy = function() {
  assert(!this.obj)
}

/**
 * Alias of `truthy`.
 *
 * @method ok
 */
Must.prototype.ok = Must.prototype.truthy 

/**
 * Assert object strict equality and identity (`===`).
 *
 * @method equal
 */
Must.prototype.equal = function(expected) {
  assert.strictEqual(this.obj, expected)
}

function unbox(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}
