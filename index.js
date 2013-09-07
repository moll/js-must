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
  insist.call(this, kindof(this.actual) == "boolean", "be a boolean")
}

/**
 * Assert object is a number.
 *
 * @method number
 */
Must.prototype.number = function() {
  insist.call(this, kindof(this.actual) == "number", "be a number")
}

/**
 * Assert object is a string.
 *
 * @method string
 */
Must.prototype.string = function() {
  insist.call(this, kindof(this.actual) == "string", "be a string")
}

/**
 * Assert object is a date.
 *
 * @method date
 */
Must.prototype.date = function() {
  insist.call(this, this.actual instanceof Date, "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @method regexp
 */
Must.prototype.regexp = function() {
  insist.call(this, this.actual instanceof RegExp, "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @method array
 */
Must.prototype.array = function() {
  insist.call(this, Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @method function
 */
Must.prototype.function = function() {
  insist.call(this, typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @method object
 */
Must.prototype.object = function() {
  var ok = this.actual && typeof this.actual == "object"
  insist.call(this, ok, "be an object")
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
  if (Array.isArray(this.actual) || kindof(this.actual) == "string")
    length = this.actual.length
  else if (typeof this.actual == "object" || typeof this.actual == "function")
    length = Object.keys(this.actual).length
  else
    length = 1

  insist.call(this, length === 0, "be empty")
}

/**
 * Assert object strict equality or identity (`===`).
 *
 * @method equal
 */
Must.prototype.equal = function(expected) {
  insist.call(this, this.actual === expected, "equal", expected)
}

/**
 * Assert object equality intelligently and by value.
 *
 * For most parts it's like strict equality (`===`), but:
 * - Boolean objects are compared to boolean literals.
 * - Number objects are compared to number literals.
 * - String objects are compared to string literals.
 * - RegExp objects are compared by their pattern and flags.
 * - Date objects are compared by their value.
 * - Arrays are compared by recursively.
 * - Plain objects are compared recursively.
 *
 * No type coercion is done and mismatching types fail.
 *
 * @method eql
 */
Must.prototype.eql = function(expected) {
  insist.call(this, eql(this.actual, expected), "be equivalent to", expected)
}

/**
 * Assert object includes `expected`.
 * For arrays checks elements, for objects checks property values and for
 * strings checks the text.
 *
 * @method include
 */
Must.prototype.include = function(expected) {
  var found
  if (Array.isArray(this.actual) || kindof(this.actual) == "string")
    found = ~this.actual.indexOf(expected)
  else
    for (var key in this.actual)
      if (this.actual[key] === expected) { found = true; break }

  insist.call(this, found, "include", expected)
}

/**
 * Assert object matches the given regular expression.
 *
 * If you pass in a non-RegExp object, it'll be implicitly converted via
 * `new RegExp(expected)
 *
 * @method match
 */
Must.prototype.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  insist.call(this, regexp.exec(this.actual), "match", regexp)
}

/**
 * Assert that a function throws.
 *
 * @method throw
 */
Must.prototype.throw = function() {
  var threw, exception
  try { this.actual.call(null) } catch (ex) { threw = true; exception = ex }
  insist.call(this, threw, "throw")
}

function eql(a, b) {
  if (a === b) return true
  if (a && b && a.constructor !== b.constructor) return false

  var aType = a && a.constructor === Object ? "hash" : kindof(a)
  var bType = b && b.constructor === Object ? "hash" : kindof(b)
  if (aType != bType) return false

  switch (aType) {
    // To compare literals with their object counterparts, use ==.
    // Type equivalence is asserted above.
    case "boolean":
    case "number":
    case "string":
      return a == b

    case "regexp":
      return a.toString() === b.toString()

    case "date":
      return +a === +b
    
    case "array":
      if (a.length != b.length) return false
      if (a.length == 0) return true

      for (var i = 0, l = a.length; i < l; ++i) 
        if (!eql(a[i], b[i])) return false
      return true

    case "hash":
      var aKeys = Object.keys(a)
      var bKeys = Object.keys(b)
      if (aKeys.length != bKeys.length) return false
      if (aKeys.length == 0) return true

      for (var key in a) if (!eql(a[key], b[key])) return false
      return true

    default:
      if (typeof a.valueOf == "function" && typeof b.valueOf == "function")
        return a.valueOf() === b.valueOf()
      else
        return false
  }
}

function unbox(obj) {
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number  ? obj.valueOf() : obj
}

function kindof(obj) {
  if (obj instanceof Date) return "date"
  if (obj instanceof RegExp) return "regexp"
  if (Array.isArray(obj)) return "array"
  return typeof unbox(obj)
}

function insist(ok, message, expected) {
  if (!this.negative ? ok : !ok) return

  var not = this.negative ? "not " : ""
  var msg = inspect(this.actual) + " must " + not
  msg += typeof message == "function" ? message(expected) : message
  if (typeof message != "function" && arguments.length == 3)
    msg += " " + inspect(expected)

  var opts = {actual: this.actual, caller: arguments.callee.caller}
  if (arguments.length >= 3) opts.expected = expected
  throw new AssertionError(msg, opts)
}

function inspect(obj) {
  if (obj instanceof RegExp) return obj.toString()
  if (obj instanceof Date) return obj.toISOString()
  if (typeof obj == "function") return obj.toString()

  // JSON by default ignores keys with undefined values.
  return JSON.stringify(obj, function(key, value) { return value })
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
