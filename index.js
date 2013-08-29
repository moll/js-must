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

Must.AssertionError = AssertionError

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
   * Inverse the assertion.
   *
   * @property not
   */
  get not() {
    var must = new Must(this.actual)
    must.negative = !this.negative
    return must
  },

  /**
   * Pass-through property for a fluent chain like `true.must.be.true`.
   * Also, can be used as an alias of `equal` with `true.must.be(true)`.
   *
   * @method be
   */
  get be() {
    var equal = this.equal.bind(this)
    equal.__proto__ = this
    return equal
  },

  /**
   * Pass-through property for a fluent chain like `expect(true).to.be.true()`.
   *
   * @property to
   */
  get to() {
    return this
  }
}

/**
 * Assert object is `true` or `new Boolean(true)`.
 *
 * @method true
 */
Must.prototype.true = function() {
  insist.call(this, this.actual === true, "be", true)
}

/**
 * Assert object is `false` or `new Boolean(false)`.
 *
 * @method false
 */
Must.prototype.false = function() {
  insist.call(this, this.actual === false, "be", false)
}

/**
 * Assert object is `null`.
 *
 * @method null
 */
Must.prototype.null = function() {
  insist.call(this, this.actual === null, "be", null)
}

/**
 * Assert object is `undefined`.
 *
 * @method undefined
 */
Must.prototype.undefined = function() {
  insist.call(this, this.actual === undefined, "be", undefined)
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
  insist.call(this, this.actual, "be truthy")
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
  insist.call(this, !this.actual, "be falsy")
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
  insist.call(this, this.actual === expected, "equal", expected)
}

/**
 * Assert object coercive equality (`==`).
 *
 * @method equal
 */
Must.prototype.eql = function(expected) {
  insist.call(this, eql(this.actual, expected), "==", expected)
}

function eql(a, b) {
  if (a == b) return true

  if (a instanceof Date && b instanceof Date)
    return +a === +b
  if (a instanceof RegExp && b instanceof RegExp)
    return a.toString() === b.toString()
}

function unbox(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}

function insist(ok, message, expected) {
  if (!this.negative ? ok : !ok) return

  var not = this.negative ? "not " : ""
  var msg = JSON.stringify(this.actual) + " must " + not + message
  if (arguments.length >= 3) msg += " " + JSON.stringify(expected)

  var opts = {actual: this.actual, caller: arguments.callee.caller}
  if (arguments.length >= 3) opts.expected = expected
  throw new AssertionError(msg, opts)
}

function AssertionError(msg, opts) {
  this.message = msg
  if (opts && "actual" in opts) this.actual = opts.actual
  if (opts && "expected" in opts) this.expected = opts.expected
  Error.captureStackTrace(this, opts && opts.caller || arguments.callee.caller)
}

AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: AssertionError,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

AssertionError.prototype.name = "AssertionError"
