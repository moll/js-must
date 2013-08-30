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
   * Pass-through property for a fluent chain.
   * Also, can be used as an alias of `instanceof` with `/a/.must.be.a(RegExp)`.
   *
   * @property a
   */
  get a() {
    var fn = this.instanceof.bind(this)
    fn.__proto__ = this
    return fn
  },

/**
   * Pass-through property for a fluent chain.
   * Also, can be used as an alias of `instanceof` with `[].must.be.an(Array)`.
   *
   * @property an
   */
  get an() {
    var fn = this.instanceof.bind(this)
    fn.__proto__ = this
    return fn
  },

  /**
   * Pass-through property for a fluent chain like `true.must.be.true`.
   * Also, can be used as an alias of `equal` with `true.must.be(true)`.
   *
   * @method be
   */
  get be() {
    var fn = this.equal.bind(this)
    fn.__proto__ = this
    return fn
  },

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
 * Assert object is a boolean (`true` or `false`).
 *
 * @method array
 */
Must.prototype.boolean = function() {
  insist.call(this, isBoolean(this.actual), "be a boolean")
}

/**
 * Assert object is a number.
 *
 * @method number
 */
Must.prototype.number = function() {
  insist.call(this, isNumber(this.actual), "be a number")
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
 * Alias of `truthy`.
 *
 * @method ok
 */
Must.prototype.ok = Must.prototype.truthy 

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
 * Assert that object is an instance of something.
 * Uses `obj instanceof expected`.
 *
 * @method instanceof
 */
Must.prototype.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  insist.call(this, ok, instanceofMessage, expected)
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || inspect(expected)
  return "be an instance of " + type
}

/**
 * Alias of `instanceof`.
 *
 * @method instanceOf
 */
Must.prototype.instanceOf = Must.prototype.instanceof 

/**
 * Assert that object's is empty.
 * Checks either the object's `length` for arrays and strings or the count of
 * (enumrable) keys.
 *
 * @method empty
 */
Must.prototype.empty = function() {
  var length
  if (Array.isArray(this.actual) || isString(this.actual))
    length = this.actual.length
  else if (typeof this.actual == "object")
    length = Object.keys(this.actual).length
  else
    length = 1

  insist.call(this, length === 0, "be empty")
}

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

// These type functions intentionally use instanceof for now to allow
// inheriting from core prototypes.
function isBoolean(obj) {
  return typeof obj == "boolean" || obj instanceof Boolean
}

function isNumber(obj) {
  return typeof obj == "number" || obj instanceof Number
}

function isString(obj) {
  return typeof obj == "string" || obj instanceof String
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
  var msg = JSON.stringify(this.actual) + " must " + not
  msg += typeof message == "function" ? message(expected) : message
  if (typeof message != "function" && arguments.length == 3)
    msg += " " + inspect(expected)

  var opts = {actual: this.actual, caller: arguments.callee.caller}
  if (arguments.length >= 3) opts.expected = expected
  throw new AssertionError(msg, opts)
}

function inspect(obj) {
  return JSON.stringify(obj)
}

function AssertionError(msg, opts) {
  this.message = msg
  if (opts && "actual" in opts) this.actual = opts.actual
  if (opts && "expected" in opts) this.expected = opts.expected
  Error.captureStackTrace(this, opts && opts.caller || arguments.callee.caller)
}

/**
 * Error object thrown when an assertion fails.
 *
 * @class AssertionError
 * @constructor
 */
AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: AssertionError,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

AssertionError.prototype.name = "AssertionError"
