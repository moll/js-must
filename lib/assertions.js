/**
 * @class Must
 */
var AssertionError = require("./assertion_error")
var kindof = require("kindof")

exports = module.exports = {
  /**
   * Pass-through property for a fluent chain.
   * Also, can be used as an alias of `instanceof` with `/a/.must.be.a(RegExp)`.
   *
   * @property a
   */
  get a() {
    return chain.call(this, this.instanceof)
  },

  /**
   * Pass-through property for a fluent chain.
   * Also, can be used as an alias of `instanceof` with `[].must.be.an(Array)`.
   *
   * @property an
   */
  get an() {
    return chain.call(this, this.instanceof)
  },

  /**
   * Pass-through property for a fluent chain like `true.must.be.true`.
   * Also, can be used as an alias of `equal` with `true.must.be(true)`.
   *
   * @method be
   */
  get be() {
    return chain.call(this, this.equal)
  },

  /**
   * Pass-through property for a fluent chain like `[1, 2].must.have.length(2)`.
   *
   * @property have
   */
  get have() {
    return this
  },

  /**
   * Inverse the assertion.
   *
   * @property not
   */
  get not() {
    var must = new this.constructor(this.actual)
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
exports.true = function() {
  var kind = kindof(this.actual)
  insist.call(this, kind == "boolean" && this.actual == true, "be", true)
}

/**
 * Assert object is `false` or `new Boolean(false)`.
 *
 * @method false
 */
exports.false = function() {
  var kind = kindof(this.actual)
  insist.call(this, kind == "boolean" && this.actual == false, "be", false)
}

/**
 * Assert object is `null`.
 *
 * @method null
 */
exports.null = function() {
  insist.call(this, this.actual === null, "be", null)
}

/**
 * Assert object is `undefined`.
 *
 * @method undefined
 */
exports.undefined = function() {
  insist.call(this, this.actual === undefined, "be", undefined)
}

/**
 * Assert object is a boolean (`true` or `false`).
 *
 * @method array
 */
exports.boolean = function() {
  insist.call(this, kindof(this.actual) == "boolean", "be a boolean")
}

/**
 * Assert object is a number.
 *
 * @method number
 */
exports.number = function() {
  insist.call(this, kindof(this.actual) == "number", "be a number")
}

/**
 * Assert object is a string.
 *
 * @method string
 */
exports.string = function() {
  insist.call(this, kindof(this.actual) == "string", "be a string")
}

/**
 * Assert object is a date.
 *
 * @method date
 */
exports.date = function() {
  insist.call(this, kindof(this.actual) == "date", "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @method regexp
 */
exports.regexp = function() {
  insist.call(this, kindof(this.actual) == "regexp", "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @method array
 */
exports.array = function() {
  insist.call(this, Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @method function
 */
exports.function = function() {
  insist.call(this, typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @method object
 */
exports.object = function() {
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
exports.truthy = function() {
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
exports.falsy = function() {
  insist.call(this, !this.actual, "be falsy")
}

/**
 * Assert object is exists — is not null or undefined.
 *
 * @method exist
 */
exports.exist = function() {
  insist.call(this, this.actual != null, "exist")
}

/**
 * Assert that object is an instance of something.
 * Uses `obj instanceof expected`.
 *
 * @method instanceof
 */
exports.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  insist.call(this, ok, instanceofMessage, expected)
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || inspect(expected)
  return "be an instance of " + type
}

/**
 * Assert that object's is empty.
 * Checks either the object's `length` for arrays and strings or the count of
 * (enumrable) keys.
 *
 * @method empty
 */
exports.empty = function() {
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
exports.equal = function(expected) {
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
exports.eql = function(expected) {
  insist.call(this, eql(this.actual, expected), "be equivalent to", expected)
}

/**
 * Assert object includes `expected`.
 * For arrays checks elements, for objects checks property values and for
 * strings checks the text.
 *
 * @method include
 */
exports.include = function(expected) {
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
exports.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  insist.call(this, regexp.exec(this.actual), "match", regexp)
}

/**
 * Assert that a function throws or throws `expected`.
 *
 * @method throw
 */
exports.throw = function(expected) {
  var threw, exception
  try { this.actual.call(null) } catch (ex) { threw = true; exception = ex }
  if (threw && arguments.length) threw = exceptionEql(exception, expected)

  var demands = [threw, "throw"]
  if (arguments.length) demands.push(expected)
  insist.apply(this, demands)
}

function exceptionEql(actual, expected) {
  if (expected == null) return actual === expected
  // NOTE: The message in new Error(message) gets converted to a string.
  var msg = kindof(actual) == "string" ? actual : actual.message

  var kind = kindof(expected)
  if (kind == "string") return msg == expected
  if (kind == "regexp") return expected.exec(msg)
  if (kind == "function") return actual instanceof expected

  return msg === expected
}

/**
 * Assert that an object has a length property equal to `expected`.
 *
 * @method length
 */
exports.length = function(expected) {
  insist.call(this, this.actual.length == expected, "have length of", expected)
}

/**
 * Assert that an object is frozen with `Object.isFrozen`.
 *
 * @method frozen
 */
exports.frozen = function() {
  insist.call(this, Object.isFrozen(this.actual), "be frozen")
}

/**
 * Assert that an object has property `property`.
 * Optionally assert it *equals* to `expected`.
 *
 * @method property
 */
exports.property = function(property, expected) {
  var ok = this.actual && property in this.actual
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
}

/**
 * Assert that an object has own property `property`.
 * Optionally assert it *equals* to `expected`.
 *
 * @method ownProperty
 */
exports.ownProperty = function(property, expected) {
  var ok = this.actual
  ok = ok && Object.prototype.hasOwnProperty.call(this.actual, property)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have own property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
}

/**
 * Assert that an object has or inherited an enumerable property `property`.
 * This also checks the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * It will fail if the object lacks the property entirely.
 *
 * @method enumerable
 */
exports.enumerable = function(property) {
  var ok = this.actual && isEnumerable(this.actual, property)
  var msg = "have enumerable property \"" + property + "\""
  insist.call(this, ok, msg)
}

/**
 * Assert that an object has or inherited a nonenumerable property `property`.
 * This also checks the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * It's the inverse of `enumerable`.
 * It will fail if the object lacks the property entirely.
 *
 * @method nonenumerable
 */
exports.nonenumerable = function(property) {
  var ok = this.actual && property in this.actual
  ok = ok && !isEnumerable(this.actual, property)
  var msg = "have nonenumerable property \"" + property + "\""
  insist.call(this, ok, msg)
}

function isEnumerable(obj, name) {
  // Using propertyIsEnumerable saves a possible looping of all keys.
  if (Object.prototype.propertyIsEnumerable.call(obj, name)) return true
  for (var key in obj) if (key == name) return true
  return false
}

// NOTE: Setting up aliases must come after getter wrapping so their
// properties are equal.
Object.getOwnPropertyNames(exports).forEach(function(name) {
  var props = Object.getOwnPropertyDescriptor(exports, name)
  if (props.get || typeof props.value != "function") return
  var fn = props.value

  Object.defineProperty(exports, name, {
    get: function() { return fn.bind(this) },
    configurable: true,
    enumrable: true
  })
})

/**
 * Alias of `truthy`.
 *
 * @method ok
 */
Object.defineProperty(exports, "ok",
  Object.getOwnPropertyDescriptor(exports, "truthy"))

/**
 * Alias of `instanceof`.
 *
 * @method instanceOf
 */
Object.defineProperty(exports, "instanceOf",
  Object.getOwnPropertyDescriptor(exports, "instanceof"))


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
  switch (kindof(obj)) {
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    // JSON by default ignores keys with undefined values.
    default: return JSON.stringify(obj, function(key, value) { return value })
  }
}

function chain(fn) {
  fn.apply = fn.apply
  fn.bind = fn.bind
  fn.call = fn.call
  fn.name = fn.name
  fn.toString = fn.toString
  fn.__proto__ = this
  return fn
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
