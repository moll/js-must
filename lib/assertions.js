/**
 * @class Must
 */
var AssertionError = require("./assertion_error")
var kindof = require("kindof")
var inspect = require("./inspect")

exports = module.exports = {
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
  get a() {
    return chain.call(this, this.instanceof)
  },

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
  get an() {
    return chain.call(this, this.instanceof)
  },

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
  get at() {
    return this
  },

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
  get be() {
    return chain.call(this, this.equal)
  },

  /**
   * Pass-through property for a fluent chain.
   *
   * @example
   * [1, 2].must.have.length(2)
   *
   * @property have
   * @on prototype
   */
  get have() {
    return this
  },

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
  get is() {
    return chain.call(this, this.equal)
  },

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
  get not() {
    var must = new this.constructor(this.actual)
    must.negative = !this.negative
    return must
  },

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
  get to() {
    return this
  }
}

/**
 * Assert object is `true` or `new Boolean(true)`.
 *
 * @example
 * true.must.be.true()
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
 * @example
 * false.must.be.false()
 * @method false
 *
 */
exports.false = function() {
  var kind = kindof(this.actual)
  insist.call(this, kind == "boolean" && this.actual == false, "be", false)
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
exports.null = function() {
  insist.call(this, this.actual === null, "be", null)
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
exports.undefined = function() {
  insist.call(this, this.actual === undefined, "be", undefined)
}

/**
 * Assert object is a boolean (`true` or `false`).  
 * Considers boxed boolean objects (`new Boolean`) also booleans.
 *
 * @example
 * true.must.be.a.boolean()
 *
 * @method boolean
 */
exports.boolean = function() {
  insist.call(this, kindof(this.actual) == "boolean", "be a boolean")
}

/**
 * Assert object is a number.  
 * Considers boxed number objects (`new Number`) also numbers.
 *
 * @example
 * (42).must.be.a.number()
 *
 * @method number
 */
exports.number = function() {
  insist.call(this, kindof(this.actual) == "number", "be a number")
}

/**
 * Assert object is a string.  
 * Considers boxed string objects (`new String`) also strings.
 *
 * @example
 * "Hello".must.be.a.string()
 *
 * @method string
 */
exports.string = function() {
  insist.call(this, kindof(this.actual) == "string", "be a string")
}

/**
 * Assert object is a date.
 *
 * @example
 * new Date().must.be.a.date()
 *
 * @method date
 */
exports.date = function() {
  insist.call(this, kindof(this.actual) == "date", "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @example
 * /[a-z]/.must.be.a.regexp()
 *
 * @method regexp
 */
exports.regexp = function() {
  insist.call(this, kindof(this.actual) == "regexp", "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @example
 * [42, 69].must.be.an.array()
 *
 * @method array
 */
exports.array = function() {
  insist.call(this, Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @example
 * (function() {}).must.be.a.function()
 *
 * @method function
 */
exports.function = function() {
  insist.call(this, typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @example
 * ({}).must.be.an.object()
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
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * (42).must.be.truthy()
 * "Hello".must.be.truthy()
 *
 * @method truthy
 */
exports.truthy = function() {
  insist.call(this, this.actual, "be truthy")
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
exports.falsy = function() {
  insist.call(this, !this.actual, "be falsy")
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
exports.exist = function() {
  insist.call(this, this.actual != null, "exist")
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
exports.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  insist.call(this, ok, instanceofMessage, expected)
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || inspect(expected)
  return "be an instance of " + type
}

/**
 * @method instanceOf
 * @alias instanceof
 */
exports.instanceOf = exports.instanceof

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
exports.empty = function() {
  var length
  if (Array.isArray(this.actual) || kindof(this.actual) == "string")
    length = this.actual.length
  else if (typeof this.actual == "object" || typeof this.actual == "function")
    length = enumerableKeys(this.actual).length
  else
    length = 1

  insist.call(this, length === 0, "be empty")
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
exports.equal = function(expected) {
  insist.call(this, this.actual === expected, "equal", expected)
}

/**
 * Assert object equality by content and if possible, recursively.  
 * Also handles circular and self-referential objects.
 *
 * For most parts it asserts strict equality (`===`), but:
 * - `Boolean` objects are compared to boolean literals.
 * - `Number` objects are compared to number literals.
 * - `String` objects are compared to string literals.
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
exports.eql = function(expected) {
  var ok = eql(this.actual, expected)
  insist.call(this, ok, "be equivalent to", expected, {diffable: true})
}

function eql(a, b, aStack, bStack) {
  if (a === b) return true

  var aType = isPlainObject(a) ? "plain" : kindof(a)
  var bType = isPlainObject(b) ? "plain" : kindof(b)
  if (aType != bType) return false

  if (aType == "object" || aType == "plain" || aType == "array") {
    var aPos = aStack && aStack.indexOf(a)
    var bPos = bStack && bStack.indexOf(b)
    if (aPos != bPos) return false
    if (aPos != null && ~aPos) return true

    aStack = aStack ? aStack.concat([a]) : [a]
    bStack = bStack ? bStack.concat([b]) : [b]
  }

  switch (aType) {
    case "number":
      if (isNaN(a) && isNaN(b)) return true
      // Fall through.

    case "boolean":
    case "string":
    case "date":
      return a.valueOf() == b.valueOf()

    case "regexp":
      return a.toString() === b.toString()
    
    case "array":
      if (a.length != b.length) return false
      if (a.length == 0) return true

      for (var i = 0, l = a.length; i < l; ++i) 
        if (!eql(a[i], b[i], aStack, bStack)) return false
      return true

    case "object":
      if (getConstructorOf(a) !== getConstructorOf(b)) return false
      if (getValueOf(a) && getValueOf(b)) return a.valueOf() === b.valueOf()
      // Fall through.

    case "plain":
      var aKeys = enumerableKeys(a)
      var bKeys = enumerableKeys(b)
      if (aKeys.length != bKeys.length) return false
      if (aKeys.length == 0) return true

      for (var key in a) if (!eql(a[key], b[key], aStack, bStack)) return false
      return true
  }

  return false
}

function isPlainObject(obj) {
  if (!obj) return false
  if (typeof obj != "object") return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object 
}

function getConstructorOf(obj) {
  var prototype = obj && Object.getPrototypeOf(obj)
  return prototype && prototype.constructor
}

function getValueOf(obj) {
  var valueOf = typeof obj.valueOf == "function" && obj.valueOf
  return valueOf && valueOf !== Object.prototype.valueOf ? valueOf : null
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
 * @method contain
 * @alias include
 */
exports.contain = exports.include

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
exports.permutationOf = function(expected) {
  var result = isPermutationOf(this.actual, expected)
  insist.call(this, result, "be a permutation of", expected, {diffable: true})
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
exports.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  insist.call(this, regexp.exec(this.actual), "match", regexp)
}

/**
 * Assert that a function throws.  
 * Optionally assert it throws `expected` (of possibly instance `constructor`).
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
 * function omg() { throw new Error("Everything's amazing and nobody's happy") }
 * omg.must.throw()
 * omg.must.throw("Everything's amazing and nobody's happy")
 * omg.must.throw(/amazing/)
 * omg.must.throw(Error)
 * omg.must.throw(Error, "Everything's amazing and nobody's happy")
 * omg.must.throw(Error, /amazing/)
 *
 * @method throw
 * @param [constructor]
 * @param [expected]
 */
exports.throw = function(constructor, expected) {
  if (arguments.length == 1) expected = constructor, constructor = null

  var ok, exception
  try { this.actual.call(null) } catch (ex) { ok = true; exception = ex }
  if (ok && constructor) ok = exception instanceof constructor
  if (ok && arguments.length) ok = exceptionEql(exception, expected)

  var demands = [ok, "throw"]
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
 * @example
 * "Something or other".must.have.length(18)
 * [1, 2, 3, "Four o'clock rock"].must.have.length(4)
 *
 * @method length
 * @param expected
 */
exports.length = function(expected) {
  insist.call(this, this.actual.length == expected, "have length of", expected)
}

/**
 * Assert that an object is frozen with `Object.isFrozen`.
 *
 * @example
 * Object.freeze({}).must.be.frozen()
 *
 * @method frozen
 */
exports.frozen = function() {
  insist.call(this, Object.isFrozen(this.actual), "be frozen")
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
exports.property = function(property, expected) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
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
exports.ownProperty = function(property, expected) {
  var ok = this.actual != null
  ok = ok && Object.prototype.hasOwnProperty.call(this.actual, property)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have own property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
}

/**
 * @method own
 * @alias ownProperty
 */
exports.own = exports.ownProperty

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
exports.keys = function(expected) {
  var ok = this.actual != null
  var keys = ok && enumerableKeys(Object(this.actual))
  ok = ok && eql(keys.sort(), expected.sort())
  insist.call(this, ok, "have keys", expected)
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
exports.ownKeys = function(expected) {
  var ok = this.actual != null
  var keys = ok && Object.keys(Object(this.actual))
  ok = ok && eql(keys.sort(), expected.sort())
  insist.call(this, ok, "have own keys", expected)
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
exports.enumerable = function(property) {
  var ok = this.actual != null
  ok = ok && isEnumerable(Object(this.actual), property)
  var msg = "have enumerable property \"" + property + "\""
  insist.call(this, ok, msg)
}

/**
 * @method enumerableProperty
 * @alias enumerable
 */
exports.enumerableProperty = exports.enumerable

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
exports.nonenumerable = function(property) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  ok = ok && !isEnumerable(Object(this.actual), property)
  var msg = "have nonenumerable property \"" + property + "\""
  insist.call(this, ok, msg)
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
exports.nonenumerableProperty = exports.nonenumerable

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
exports.below = function(expected) {
  insist.call(this, this.actual < expected, "be below", expected)
}

/**
 * @method lt
 * @alias below
 */
exports.lt = exports.below

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
exports.before = exports.below

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
exports.most = function(expected) {
  insist.call(this, this.actual <= expected, "be at most", expected)
}

/**
 * @method lte
 * @alias most
 */
exports.lte = exports.most

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
exports.above = function(expected) {
  insist.call(this, this.actual > expected, "be above", expected)
}

/**
 * @method gt
 * @alias above
 */
exports.gt = exports.above

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
exports.after = exports.above

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
exports.least = function(expected) {
  insist.call(this, this.actual >= expected, "be at least", expected)
}

/**
 * @method gte
 * @alias least
 */
exports.gte = exports.least

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
exports.between = function(begin, end) {
  insist.call(this, begin <= this.actual && this.actual <= end, function() {
    return "be between " + inspect(begin) + " and " + inspect(end)
  })
}

function insist(ok, message, expected, opts) {
  if (!this.negative ? ok : !ok) return

  var not = this.negative ? "not " : ""
  var msg = inspect(this.actual) + " must " + not
  msg += typeof message == "function" ? message(expected) : message
  if (typeof message != "function" && arguments.length >= 3)
    msg += " " + inspect(expected)

  opts = opts ? Object.create(opts) : {}
  opts.actual = this.actual
  opts.caller = arguments.callee.caller
  if (arguments.length >= 3) opts.expected = expected
  throw new AssertionError(msg, opts)
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

function enumerableKeys(obj) {
  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}
