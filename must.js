var O = require("oolong")
var AssertionError = require("./lib/assertion_error")
var Resolvable = require("./lib/resolvable")
var Rejectable = require("./lib/rejectable")
var kindof = require("kindof")
var egal = require("egal")
var deepEgal = egal.deepEgal
var stringify = require("./lib").stringify
var chain = require("./lib").chain
var defineGetter = O.defineGetter
var lookupGetter = O.lookupGetter
var startsWith = require("./lib/es6").startsWith
var endsWith = require("./lib/es6").endsWith
var hasOwn = Function.call.bind(Object.hasOwnProperty)
var ANY = {}
exports = module.exports = Must
exports.AssertionError = AssertionError
exports.stringify = stringify
exports.chain = chain

/**
 * The main class that wraps the asserted object and that you call matchers on.
 *
 * To include a custom error message for failure cases, pass a string as the
 * second argument.
 *
 * Most of the time you'll be using
 * [`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
 * occasionally you might want to assert `null`s or `undefined`s and in those
 * cases assigning `Must` to something like `expect` or `demand` works nicely.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 *
 * var expect = require("must")
 * expect(null).to.be.null()
 *
 * var demand = require("must")
 * demand(undefined, "The undefined undefineds").be.undefined()
 *
 * @class Must
 * @constructor
 * @param actual
 * @param [message]
 */
function Must(actual, message) {
  if (!(this instanceof Must)) return new Must(actual, message)
  this.actual = actual
  if (message != null) this.message = message
}

/**
  * Can also be used a pass-through property for a fluent chain.
  *
  * @example
  * "Hello".must.be.a.string()
  * new Date().must.be.a(Date)
  *
  * @method a
  * @alias instanceof
  */
defineGetter(Must.prototype, "a", function() {
  return chain(this, this.instanceof)
})

/**
  * Can also be used a pass-through property for a fluent chain.
  *
  * @example
  * [1, 2].must.be.an.array()
  * new AwesomeClass().must.be.an(AwesomeClass)
  *
  * @method an
  * @alias instanceof
  */
defineGetter(Must.prototype, "an", lookupGetter(Must.prototype, "a"))

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.be.at.most(69)
  * (1337).must.be.at.least(1337)
  *
  * @property at
  * @on prototype
  */
defineGetter(Must.prototype, "at", passthrough)

/**
  * Can also be used as a pass-through property for a fluent chain.
  *
  * @example
  * true.must.be.true()
  * (42).must.be(42)
  *
  * @method be
  * @alias equal
  */
defineGetter(Must.prototype, "be", function() {
  return chain(this, this.equal)
})

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * [1, 2].must.have.length(2)
  *
  * @property have
  * @on prototype
  */
defineGetter(Must.prototype, "have", passthrough)

/**
  * Inverse the assertion.  
  * Use it multiple times to create lots of fun!
  * `true.must.not.not.be.true()` :-)
  *
  * @example
  * true.must.not.be.true()
  * [].must.not.be.empty()
  *
  * @property not
  * @on prototype
  */
defineGetter(Must.prototype, "not", function() {
  // NOTE: Dear reader or plugin author, please don't depend on this property
  // name will remain as-is. If you really need to, let me know how you'd like
  // to use it. XO.
  var self = Object.create(this)
  self.negative = !self.negative
  return self
})

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * var expect = require("must")
  * expect(true).to.be.true()
  *
  * var wish = require("must")
  * wish(life).to.be.truthy()
  *
  * @property to
  * @on prototype
  */
defineGetter(Must.prototype, "to", passthrough)

/**
 * Assert object is `true`.  
 * A boxed boolean object (`new Boolean(true`) is _not_ considered true.
 *
 * @example
 * true.must.be.true()
 *
 * @method true
 */
Must.prototype.true = function() {
  this.assert(this.actual === true, "be", {expected: true})
}

/**
 * Assert object is `false`.  
 * A boxed boolean object (`new Boolean(false`) is _not_ considered false.
 *
 * @example
 * false.must.be.false()
 * @method false
 *
 */
Must.prototype.false = function() {
  this.assert(this.actual === false, "be", {expected: false})
}

/**
 * Assert object is `NaN`.
 *
 * @example
 * NaN.must.be.nan()
 *
 * @method nan
 */
Must.prototype.nan = function() {
  this.assert(this.actual !== this.actual, "be", {expected: NaN})
}

/**
 * Assert object is `null`.
 *
 * Because JavaScript does not allow method calls on `null`, you'll have to
 * wrap an expected null with [`Must`](#Must). Assigning `require("must")` to
 * `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `null`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(null).be.null()
 *
 * @method null
 */
Must.prototype.null = function() {
  this.assert(this.actual === null, "be", {expected: null})
}

/**
 * Assert object is `undefined`.
 *
 * Because JavaScript does not allow method calls on `undefined`, you'll have to
 * wrap an expected undefined with [`Must`](#Must). Assigning `require("must")`
 * to `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `undefined`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(undefined).be.undefined()
 *
 * @method undefined
 */
Must.prototype.undefined = function() {
  this.assert(this.actual === undefined, "be", {expected: undefined})
}

/**
 * Assert object is a boolean (`true` or `false`).  
 * Boxed boolean objects (`new Boolean`) are _not_ considered booleans.
 *
 * @example
 * true.must.be.a.boolean()
 *
 * @method boolean
 */
Must.prototype.boolean = function() {
  this.assert(typeof this.actual == "boolean", "be a boolean")
}

/**
 * Assert object is a number.  
 * Boxed number objects (`new Number`) are _not_ considered numbers.
 *
 * @example
 * (42).must.be.a.number()
 *
 * @method number
 */
Must.prototype.number = function() {
  this.assert(typeof this.actual == "number", "be a number")
}

/**
 * Assert object is a string.  
 * Boxed string objects (`new String`) are _not_ considered strings.
 *
 * @example
 * "Hello".must.be.a.string()
 *
 * @method string
 */
Must.prototype.string = function() {
  this.assert(typeof this.actual == "string", "be a string")
}

/**
 * Assert object is a symbol.
 *
 * @example
 * Symbol().must.be.a.symbol()
 *
 * @method symbol
 */
Must.prototype.symbol = function() {
  this.assert(typeof this.actual == "symbol", "be a symbol")
}

/**
 * Assert object is a date.
 *
 * @example
 * new Date().must.be.a.date()
 *
 * @method date
 */
Must.prototype.date = function() {
  this.assert(kindof(this.actual) == "date", "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @example
 * /[a-z]/.must.be.a.regexp()
 *
 * @method regexp
 */
Must.prototype.regexp = function() {
  this.assert(kindof(this.actual) == "regexp", "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @example
 * [42, 69].must.be.an.array()
 *
 * @method array
 */
Must.prototype.array = function() {
  this.assert(Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @example
 * (function() {}).must.be.a.function()
 *
 * @method function
 */
Must.prototype.function = function() {
  this.assert(typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @example
 * ({}).must.be.an.object()
 *
 * @method object
 */
Must.prototype.object = function() {
  var ok = this.actual && typeof this.actual == "object"
  this.assert(ok, "be an object")
}

/**
 * Assert object is truthy (`!!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * (42).must.be.truthy()
 * "Hello".must.be.truthy()
 *
 * @method truthy
 */
Must.prototype.truthy = function() {
  this.assert(this.actual, "be truthy")
}

/**
 * Assert object is falsy (`!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * 0.must.be.falsy()
 * "".must.be.falsy()
 *
 * @method falsy
 */
Must.prototype.falsy = function() {
  this.assert(!this.actual, "be falsy")
}

/**
 * Assert object is exists and thereby is not null or undefined.
 *
 * @example
 * 0.must.exist()
 * "".must.exist()
 * ({}).must.exist()
 *
 * @method exist
 */
Must.prototype.exist = function() {
  this.assert(this.actual != null, "exist")
}

/**
 * Assert that an object is an instance of something.  
 * Uses `obj instanceof expected`.
 *
 * @example
 * new Date().must.be.an.instanceof(Date)
 *
 * @method instanceof
 * @param class
 */
Must.prototype.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  this.assert(ok, instanceofMessage.bind(this, expected), {expected: expected})
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || stringify(expected)
  return "be an instance of " + type
}

/**
 * @method instanceOf
 * @alias instanceof
 */
Must.prototype.instanceOf = Must.prototype.instanceof

/**
 * Assert that an object is empty.  
 * Checks either the `length` for arrays and strings or the count of
 * enumerable keys. Inherited keys also counted.
 *
 * @example
 * "".must.be.empty()
 * [].must.be.empty()
 * ({}).must.be.empty()
 *
 * @method empty
 */
Must.prototype.empty = function() {
  var ok = false
  if (typeof this.actual === "string" || Array.isArray(this.actual))
    ok = this.actual.length === 0
  else if (typeof this.actual == "object" || typeof this.actual == "function")
    ok = O.isEmpty(this.actual)

  this.assert(ok, "be empty")
}

/**
 * Assert a string ends with the given string.
 *
 * @example
 * "Hello, John".must.endWith("John")
 *
 * @method endWith
 * @param expected
 */
Must.prototype.endWith = function(expected) {
  this.assert(endsWith(this.actual, expected), "end with", {expected: expected})
}

/**
 * Assert object strict equality or identity (`===`).
 *
 * To compare value objects (like `Date` or `RegExp`) by their value rather
 * than identity, use [`eql`](#Must.prototype.eql).  
 * To compare arrays and objects by content, also use
 * [`eql`](#Must.prototype.eql).
 *
 * @example
 * (42).must.equal(42)
 *
 * var date = new Date
 * date.must.equal(date)
 *
 * @method equal
 * @param expected
 */
Must.prototype.equal = function(expected) {
  this.assert(this.actual === expected, "equal", {expected: expected})
}

/**
 * Assert that an object is an error (instance of `Error` by default).  
 * Optionally assert it matches `expected` (and/or is of instance
 * `constructor`).  
 * When you have a function that's supposed to throw, use
 * [`throw`](#Must.prototype.throw).
 *
 * Given `expected`, the error is asserted as follows:
 * - A **string** is compared with the exception's `message` property.
 * - A **regular expression** is matched against the exception's `message`
 *   property.
 * - A **function** (a.k.a. constructor) is used to check if the error
 *   is an `instanceof` that constructor.
 * - All other cases of `expected` are left unspecified for now.
 *
 * @example
 * var err = throw new RangeError("Everything's amazing and nobody's happy") }
 * err.must.be.an.error()
 * err.must.be.an.error("Everything's amazing and nobody's happy")
 * err.must.be.an.error(/amazing/)
 * err.must.be.an.error(Error)
 * err.must.be.an.error(RangeError)
 * err.must.be.an.error(RangeError, "Everything's amazing and nobody's happy")
 * err.must.be.an.error(RangeError, /amazing/)
 *
 * @method error
 * @param [constructor]
 * @param [expected]
 */
Must.prototype.error = function(type, expected) {
  if (arguments.length <= 1) expected = ANY
  if (arguments.length == 1 && !isFn(type)) { expected = type; type = null }

  var ok = isError(this.actual, type || Error, expected)
  var msg = expected !== ANY ? "be an error matching" : "be an error"
  var opts = expected !== ANY ? {expected: expected} : null
  this.assert(ok, msg, opts)
}

/**
  * Can also be used as a pass-through property for a fluent chain.
  *
  * @example
  * var claim = require("must")
  * claim(true).is.true()
  * claim(42).is(42)
  *
  * @method is
  * @alias equal
  */
defineGetter(Must.prototype, "is", lookupGetter(Must.prototype, "be"))

/**
 * Assert object equality by content and if possible, recursively.  
 * Also handles circular and self-referential objects.
 *
 * For most parts it asserts strict equality (`===`), but:
 * - `RegExp` objects are compared by their pattern and flags.
 * - `Date` objects are compared by their value.
 * - `Array` objects are compared recursively.
 * - `NaN`s are considered equivalent.
 * - Instances of the same class with a `valueOf` function are compared by its
 *   output.
 * - Plain objects and instances of the same class are compared recursively.
 *
 * **Does not coerce types** so **mismatching types fail**.  
 * Inherited enumerable properties are also taken into account.
 *
 * **Instances** are objects whose prototype's `constructor` property is set.
 * E.g. `new MyClass`.  
 * Others, like `{}` or `Object.create({})`, are **plain objects**.
 *
 * @example
 * /[a-z]/.must.eql(/[a-z]/)
 * new Date(1987, 5, 18).must.eql(new Date(1987, 5, 18))
 * ["Lisp", 42].must.eql(["Lisp", 42])
 * ({life: 42, love: 69}).must.eql({life: 42, love: 69})
 * NaN.must.eql(NaN)
 *
 * function Answer(answer) { this.answer = answer }
 * new Answer(42).must.eql(new Answer(42))
 *
 * @method eql
 * @param expected
 */
Must.prototype.eql = function(expected) {
  var ok = deepEgal(this.actual, expected, eql)
  this.assert(ok, "be equivalent to", {expected: expected, diffable: true})
}

/**
 * Assert object includes `expected`.
 *
 * For strings it checks the text, for arrays it checks elements and for
 * objects the property values. Everything is checked with strict equals
 * (`===`).
 *
 * @example
 * "Hello, John!".must.include("John")
 * [1, 42, 3].must.include(42)
 * ({life: 42, love: 69}).must.include(42)
 *
 * @method include
 * @param expected
 */
Must.prototype.include = function(expected) {
  var found
  if (typeof this.actual === "string" || Array.isArray(this.actual))
    found = this.actual.indexOf(expected) >= 0
  else
    for (var key in this.actual)
      if (this.actual[key] === expected) { found = true; break }

  this.assert(found, "include", {expected: expected})
}

/**
 * @method contain
 * @alias include
 */
Must.prototype.contain = Must.prototype.include

/**
 * Assert that an array is a permutation of the given array.
 *
 * An array is a permutation of another if they both have the same elements
 * (including the same number of duplicates) regardless of their order.
 * Elements are checked with strict equals (`===`).
 *
 * @example
 * [1, 1, 2, 3].must.be.a.permutationOf([3, 2, 1, 1])
 * [7, 8, 8, 9].must.not.be.a.permutationOf([9, 8, 7])
 *
 * @method permutationOf
 * @param expected
 */
Must.prototype.permutationOf = function(expected) {
  var ok = isPermutationOf(this.actual, expected)
  this.assert(ok, "be a permutation of", {expected: expected, diffable: true})
}

function isPermutationOf(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) return false
  if (actual.length !== expected.length) return false

  actual = actual.slice().sort()
  expected = expected.slice().sort()
  for (var i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) return false
  }

  return true
}

/**
 * Assert object matches the given regular expression.
 *
 * If you pass in a non regular expression object, it'll be converted to one
 * via `new RegExp(regexp)`.
 *
 * @example
 * "Hello, John!".must.match(/john/i)
 * "Wei wu wei".must.match("wu")
 *
 * @method match
 * @param regexp
 */
Must.prototype.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  this.assert(regexp.exec(this.actual), "match", {expected: regexp})
}

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.must.must.must.equal(42)
  *
  * @property must
  * @on prototype
  */
defineGetter(Must.prototype, "must", passthrough)

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.be.the.number()
  *
  * @property the
  * @on prototype
  */
defineGetter(Must.prototype, "the", passthrough)

/**
 * Assert that a function throws.  
 * Optionally assert it throws `expected` (and/or is of instance
 * `constructor`).  
 * When you already have an error reference, use
 * [`error`](#Must.prototype.error).
 *
 * Given `expected`, the error is asserted as follows:
 * - A **string** is compared with the exception's `message` property.
 * - A **regular expression** is matched against the exception's `message`
 *   property.
 * - A **function** (a.k.a. constructor) is used to check if the error
 *   is an `instanceof` that constructor.
 * - All other cases of `expected` are left unspecified for now.
 *
 * Because of how JavaScript works, the function will be called in `null`
 * context (`this`). If you want to test an instance method, bind it:
 * `obj.method.bind(obj).must.throw()`.
 *
 * @example
 * function omg() {
 *   throw new RangeError("Everything's amazing and nobody's happy")
 * }
 *
 * omg.must.throw()
 * omg.must.throw("Everything's amazing and nobody's happy")
 * omg.must.throw(/amazing/)
 * omg.must.throw(Error)
 * omg.must.throw(RangeError)
 * omg.must.throw(RangeError, "Everything's amazing and nobody's happy")
 * omg.must.throw(RangeError, /amazing/)
 *
 * @method throw
 * @param [constructor]
 * @param [expected]
 */
Must.prototype.throw = function(type, expected) {
  if (arguments.length <= 1) expected = ANY
  if (arguments.length == 1 && !isFn(type)) { expected = type; type = null }

  var ok = false, exception
  try { this.actual.call(null) } catch (ex) { ok = true; exception = ex }
  ok = ok && isError(exception, type, expected)

  var opts = {actual: exception}
  if (expected !== ANY) opts.expected = expected
  this.assert(ok, "throw", opts)
}

/**
 * Assert that an object has a length property equal to `expected`.
 *
 * @example
 * "Something or other".must.have.length(18)
 * [1, 2, 3, "Four o'clock rock"].must.have.length(4)
 *
 * @method length
 * @param expected
 */
Must.prototype.length = function(expected) {
  var ok = this.actual.length == expected
  this.assert(ok, "have length of", {expected: expected})
}

/**
 * Assert that an object is frozen with `Object.isFrozen`.
 *
 * @example
 * Object.freeze({}).must.be.frozen()
 *
 * @method frozen
 */
Must.prototype.frozen = function() {
  this.assert(Object.isFrozen(this.actual), "be frozen")
}

/**
 * Assert that an object has all of the properties given in `properties` with
 * equal (`===`) values.  In other words, asserts that the given object is
 * a subset of the one asserted against.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownProperties`](#Must.prototype.ownProperties).
 *
 * @example
 * var john = {name: "John", age: 42, sex: "male"}
 * john.must.have.properties({name: "John", sex: "male"})
 *
 * @method properties
 * @param properties
 */
Must.prototype.properties = function(props) {
  var obj = this.actual
  var ok = this.actual != null

  if (ok) for (var key in props) {
    ok = key in obj && obj[key] === props[key]
    if (!ok) break
  }

  this.assert(ok, "have properties", {expected: props, diffable: true})
}

/**
 * Assert that an object has all of the properties given in `properties` with
 * equal (`===`) values and that they're own properties.  In other words,
 * asserts that the given object is a subset of the one asserted against.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`properties`](#Must.prototype.properties).
 *
 * @example
 * var john = {name: "John", age: 42, sex: "male"}
 * john.must.have.ownProperties({name: "John", sex: "male"})
 *
 * @method ownProperties
 * @param properties
 */
Must.prototype.ownProperties = function(props) {
  var obj = this.actual
  var ok = this.actual != null

  if (ok) for (var key in props) {
    ok = key in obj && hasOwn(obj, key) && obj[key] === props[key]
    if (!ok) break
  }

  this.assert(ok, "have own properties", {expected: props, diffable: true})
}

/**
 * Assert that an object has property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownProperty`](#Must.prototype.ownProperty).
 *
 * @example
 * (function() {}).must.have.property("call")
 * ({life: 42, love: 69}).must.have.property("love", 69)
 *
 * @method property
 * @param property
 * @param [value]
 */
Must.prototype.property = function(property, expected) {
  var ok = this.actual != null && property in Object(this.actual)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have property \"" + property + "\"", opts
  if (arguments.length > 1) { msg += " equal to"; opts = {expected: expected} }
  this.assert(ok, msg, opts)
}

/**
 * Assert that an object has own property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownProperty("love", 69)
 *
 * @method ownProperty
 * @param property
 * @param [value]
 */
Must.prototype.ownProperty = function(property, expected) {
  var ok = this.actual != null
  ok = ok && hasOwn(this.actual, property)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have own property \"" + property + "\"", opts
  if (arguments.length > 1) { msg += " equal to"; opts = {expected: expected} }
  this.assert(ok, msg, opts)
}

/**
 * @method own
 * @alias ownProperty
 */
Must.prototype.own = Must.prototype.ownProperty

/**
 * Assert that an object has only the expected enumerable `keys`.  
 * Pass an array of strings as `keys`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownKeys`](#Must.prototype.ownKeys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.keys(["life", "love"])
 * Object.create({life: 42}).must.have.keys(["life"])
 *
 * @method keys
 * @param keys
 */
Must.prototype.keys = function(expected) {
  var ok = this.actual != null
  ok = ok && isPermutationOf(O.keys(Object(this.actual)), expected)
  this.assert(ok, "have keys", {expected: expected})
}

/**
 * Assert that an object has only the expected enumerable `keys` of its own.  
 * Pass an array of strings as `keys`.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`keys`](#Must.prototype.keys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownKeys(["life", "love"])
 *
 * @method ownKeys
 * @param keys
 */
Must.prototype.ownKeys = function(expected) {
  var ok = this.actual != null
  ok = ok && isPermutationOf(Object.keys(Object(this.actual)), expected)
  this.assert(ok, "have own keys", {expected: expected})
}

/**
 * Assert that an object has an enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * For checking if a property exists *and* is non-enumerable, see
 * [`nonenumerable`](#Must.prototype.nonenumerable).
 *
 * @example
 * ({life: 42, love: 69}).must.have.enumerable("love")
 *
 * @method enumerable
 * @param property
 */
Must.prototype.enumerable = function(property) {
  var ok = this.actual != null
  ok = ok && isEnumerable(Object(this.actual), property)
  this.assert(ok, "have enumerable property \"" + property + "\"")
}

/**
 * @method enumerableProperty
 * @alias enumerable
 */
Must.prototype.enumerableProperty = Must.prototype.enumerable

/**
 * Assert that an object has a non-enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * It's the inverse of [`enumerable`](#Must.prototype.enumerable).
 *
 * @example
 * (function() {}).must.have.nonenumerable("call")
 * Object.create({}, {love: {enumerable: 0}}).must.have.nonenumerable("love")
 *
 * @method nonenumerable
 * @param property
 */
Must.prototype.nonenumerable = function(property) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  ok = ok && !isEnumerable(Object(this.actual), property)
  this.assert(ok, "have nonenumerable property \"" + property + "\"")
}

function isEnumerable(obj, name) {
  // Using propertyIsEnumerable saves a possible looping of all keys.
  if (Object.prototype.propertyIsEnumerable.call(obj, name)) return true
  for (var key in obj) if (key == name) return true
  return false
}

/**
 * @method nonenumerableProperty
 * @alias nonenumerable
 */
Must.prototype.nonenumerableProperty = Must.prototype.nonenumerable

/**
 * Assert that an object is below and less than (`<`) `expected`.  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.below(69)
 *
 * @method below
 * @param expected
 */
Must.prototype.below = function(expected) {
  this.assert(this.actual < expected, "be below", {expected: expected})
}

/**
 * @method lt
 * @alias below
 */
Must.prototype.lt = Must.prototype.below

/**
 * Works well with dates where saying *before* is more natural than *below* or
 * *less than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers,
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (42).must.be.before(1337)
 * new Date(2000, 5, 18).must.be.before(new Date(2001, 0, 1))
 *
 * @method before
 * @alias below
 */
Must.prototype.before = Must.prototype.below

/**
 * Assert that an object is at most, less than or equal to (`<=`), `expected`.  
 * Uses `<=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.at.most(69)
 * (42).must.be.at.most(42)
 *
 * @method most
 * @param expected
 */
Must.prototype.most = function(expected) {
  this.assert(this.actual <= expected, "be at most", {expected: expected})
}

/**
 * @method lte
 * @alias most
 */
Must.prototype.lte = Must.prototype.most

/**
 * Assert that an object is above and greater than (`>`) `expected`.  
 * Uses `>` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.above(42)
 *
 * @method above
 * @param expected
 */
Must.prototype.above = function(expected) {
  this.assert(this.actual > expected, "be above", {expected: expected})
}

/**
 * @method gt
 * @alias above
 */
Must.prototype.gt = Must.prototype.above

/**
 * Works well with dates where saying *after* is more natural than *above* or
 * *greater than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers,
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (1337).must.be.after(42)
 * new Date(2030, 5, 18).must.be.after(new Date(2013, 9, 23))
 *
 * @method after
 * @alias above
 */
Must.prototype.after = Must.prototype.above

/**
 * Assert that an object is at least, greater than or equal to (`>=`),
 * `expected`.  
 * Uses `>=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.at.least(42)
 * (42).must.be.at.least(42)
 *
 * @method least
 * @param expected
 */
Must.prototype.least = function(expected) {
  this.assert(this.actual >= expected, "be at least", {expected: expected})
}

/**
 * @method gte
 * @alias least
 */
Must.prototype.gte = Must.prototype.least

/**
 * Assert that an object is between `begin` and `end` (inclusive).  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (13).must.be.between(13, 69)
 * (42).must.be.between(13, 69)
 * (69).must.be.between(13, 69)
 *
 * @method between
 * @param begin
 * @param end
 */
Must.prototype.between = function(begin, end) {
  this.assert(begin <= this.actual && this.actual <= end, function() {
    return "be between " + stringify(begin) + " and " + stringify(end)
  })
}
/**
 * Makes any matcher following the use of `resolve` wait till a promise
 * resolves before asserting.  
 * Returns a new promise that will either resolve if the assertion passed or
 * fail with `AssertionError`.
 *
 * Promises are transparent to matchers, so everything will also work with
 * customer matchers you've added to `Must.prototype`. Internally Must just
 * waits on the promise and calls the matcher function once it's resolved.
 *
 * With [Mocha](http://mochajs.org), using this will look something like:
 *
 * ```javascript
 * it("must pass", function() {
 *   return Promise.resolve(42).must.resolve.to.equal(42)
 * })
 * ```
 *
 * Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
 * ```javascript
 * it("must pass", function*() {
 *   yield Promise.resolve(42).must.resolve.to.equal(42)
 *   yield Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
 * })
 * ```
 *
 * @example
 * Promise.resolve(42).must.resolve.to.equal(42)
 * Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
 *
 * @property resolve
 * @on prototype
 */
defineGetter(Must.prototype, "resolve", function() {
  return Resolvable(this)
})

/**
 * @example
 * Promise.resolve(42).must.then.equal(42)
 *
 * @property then
 * @on prototype
 * @alias resolve
 */
defineGetter(Must.prototype, "then", lookupGetter(Must.prototype, "resolve"))

/**
 * @example
 * Promise.resolve(42).must.eventually.equal(42)
 *
 * @property eventually
 * @on prototype
 * @alias resolve
 */
defineGetter(Must.prototype, "eventually",
             lookupGetter(Must.prototype, "resolve"))

/**
 * Makes any matcher following the use of `reject` wait till a promise
 * is rejected before asserting.  
 * Returns a new promise that will either resolve if the assertion passed or
 * fail with `AssertionError`.
 *
 * Promises are transparent to matchers, so everything will also work with
 * customer matchers you've added to `Must.prototype`. Internally Must just
 * waits on the promise and calls the matcher function once it's rejected.
 *
 * With [Mocha](http://mochajs.org), using this will look something like:
 *
 * ```javascript
 * it("must pass", function() {
 *   return Promise.reject(42).must.reject.to.equal(42)
 * })
 * ```
 *
 * Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
 * ```javascript
 * it("must pass", function*() {
 *   yield Promise.reject(42).must.reject.to.equal(42)
 *   yield Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
 * })
 * ```
 *
 * @example
 * Promise.reject(42).must.reject.to.equal(42)
 * Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
 *
 * @property reject
 * @on prototype
 */
defineGetter(Must.prototype, "reject", function() {
  return Rejectable(this)
})

/**
 * Assert a string starts with the given string.
 *
 * @example
 * "Hello, John".must.startWith("Hello")
 *
 * @method startWith
 * @param expected
 */
Must.prototype.startWith = function(expected) {
  var ok = startsWith(this.actual, expected)
  this.assert(ok, "start with", {expected: expected})
}

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * Promise.resolve(42).must.resolve.with.number()
  *
  * @property with
  * @on prototype
  */
defineGetter(Must.prototype, "with", passthrough)

Must.prototype.assert = function assert(ok, message, opts) {
  if (!this.negative ? ok : !ok) return

  opts = opts ? Object.create(opts) : {}
  if (!("actual" in opts)) opts.actual = this.actual

  if (!("caller" in opts)) {
    // Accessing caller in strict mode throws TypeError.
    try { opts.caller = assert.caller }
    catch (ex) { opts.caller = assert }
  }

  var msg = stringify(this.actual) + " must " + (this.negative ? "not " : "")
  if (typeof message == "function") msg += message.call(this)
  else msg += message + ("expected" in opts ? " "+stringify(opts.expected) : "")
  if (this.message != null) msg = this.message + ": " + msg

  throw new AssertionError(msg, opts)
}

Object.defineProperty(Must.prototype, "assert", {enumerable: false})

function eql(a, b) {
  if (egal(a, b)) return true

  var type = kindofPlain(a)
  if (type !== kindofPlain(b)) return false
  if (isNumber(a) && isNumber(b) && isNaN(+a) && isNaN(+b)) return true

  switch (type) {
    case "array":
    case "plain":
      return null

    case "object":
      if (getConstructorOf(a) !== getConstructorOf(b)) return false
      if (hasValueOf(a) && hasValueOf(b)) return false
      return null

    default: return false
  }
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype === null ? undefined : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf === "function" && valueOf !== Object.prototype.valueOf
}

function kindofPlain(obj) {
  var type = kindof(obj)
  if (type === "object" && O.isPlainObject(obj)) return "plain"
  return type
}

function isError(err, constructor, expected) {
  if (constructor != null && !(err instanceof constructor)) return false
  if (expected === ANY) return true

  switch (kindof(expected)) {
    case "string": return messageFromError(err) === expected
    case "regexp": return expected.exec(messageFromError(err))
    default: return err === expected
  }
}

function messageFromError(err) {
  // The message in new Error(message) gets converted to a string.
  return err == null || typeof err == "string" ? err : err.message
}

function isFn(fn) { return typeof fn === "function" }
function isNumber(n) { return typeof n === "number" || n instanceof Number }
function passthrough() { return this }
