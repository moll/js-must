Must.js API Documentation
=========================
### [Must](#Must)
- [.prototype.a](#Must.prototype.a)(class)
- [.prototype.above](#Must.prototype.above)(expected)
- [.prototype.after](#Must.prototype.after)(expected)
- [.prototype.an](#Must.prototype.an)(class)
- [.prototype.array](#Must.prototype.array)()
- [.prototype.at](#Must.prototype.at)
- [.prototype.be](#Must.prototype.be)(expected)
- [.prototype.before](#Must.prototype.before)(expected)
- [.prototype.below](#Must.prototype.below)(expected)
- [.prototype.between](#Must.prototype.between)(begin, end)
- [.prototype.boolean](#Must.prototype.boolean)()
- [.prototype.contain](#Must.prototype.contain)(expected)
- [.prototype.date](#Must.prototype.date)()
- [.prototype.empty](#Must.prototype.empty)()
- [.prototype.endWith](#Must.prototype.endWith)(expected)
- [.prototype.enumerable](#Must.prototype.enumerable)(property)
- [.prototype.enumerableProperty](#Must.prototype.enumerableProperty)(property)
- [.prototype.eql](#Must.prototype.eql)(expected)
- [.prototype.equal](#Must.prototype.equal)(expected)
- [.prototype.error](#Must.prototype.error)([constructor], [expected])
- [.prototype.eventually](#Must.prototype.eventually)
- [.prototype.exist](#Must.prototype.exist)()
- [.prototype.false](#Must.prototype.false)()
- [.prototype.falsy](#Must.prototype.falsy)()
- [.prototype.frozen](#Must.prototype.frozen)()
- [.prototype.function](#Must.prototype.function)()
- [.prototype.gt](#Must.prototype.gt)(expected)
- [.prototype.gte](#Must.prototype.gte)(expected)
- [.prototype.have](#Must.prototype.have)
- [.prototype.include](#Must.prototype.include)(expected)
- [.prototype.instanceOf](#Must.prototype.instanceOf)(class)
- [.prototype.instanceof](#Must.prototype.instanceof)(class)
- [.prototype.is](#Must.prototype.is)(expected)
- [.prototype.keys](#Must.prototype.keys)(keys)
- [.prototype.least](#Must.prototype.least)(expected)
- [.prototype.length](#Must.prototype.length)(expected)
- [.prototype.lt](#Must.prototype.lt)(expected)
- [.prototype.lte](#Must.prototype.lte)(expected)
- [.prototype.match](#Must.prototype.match)(regexp)
- [.prototype.most](#Must.prototype.most)(expected)
- [.prototype.must](#Must.prototype.must)
- [.prototype.nan](#Must.prototype.nan)()
- [.prototype.nonenumerable](#Must.prototype.nonenumerable)(property)
- [.prototype.nonenumerableProperty](#Must.prototype.nonenumerableProperty)(property)
- [.prototype.not](#Must.prototype.not)
- [.prototype.null](#Must.prototype.null)()
- [.prototype.number](#Must.prototype.number)()
- [.prototype.object](#Must.prototype.object)()
- [.prototype.own](#Must.prototype.own)(property, [value])
- [.prototype.ownKeys](#Must.prototype.ownKeys)(keys)
- [.prototype.ownProperties](#Must.prototype.ownProperties)(properties)
- [.prototype.ownProperty](#Must.prototype.ownProperty)(property, [value])
- [.prototype.permutationOf](#Must.prototype.permutationOf)(expected)
- [.prototype.properties](#Must.prototype.properties)(properties)
- [.prototype.property](#Must.prototype.property)(property, [value])
- [.prototype.regexp](#Must.prototype.regexp)()
- [.prototype.reject](#Must.prototype.reject)
- [.prototype.resolve](#Must.prototype.resolve)
- [.prototype.startWith](#Must.prototype.startWith)(expected)
- [.prototype.string](#Must.prototype.string)()
- [.prototype.symbol](#Must.prototype.symbol)()
- [.prototype.the](#Must.prototype.the)
- [.prototype.then](#Must.prototype.then)
- [.prototype.throw](#Must.prototype.throw)([constructor], [expected])
- [.prototype.to](#Must.prototype.to)
- [.prototype.true](#Must.prototype.true)()
- [.prototype.truthy](#Must.prototype.truthy)()
- [.prototype.undefined](#Must.prototype.undefined)()
- [.prototype.with](#Must.prototype.with)

### [Object](#Object)
- [.prototype.must](#Object.prototype.must)

### [AssertionError](#AssertionError)
- [actual](#assertionError.actual)
- [diffable](#assertionError.diffable)
- [expected](#assertionError.expected)
- [showDiff](#assertionError.showDiff)
- [stack](#assertionError.stack)


<a name="Must" />
Must(actual, [message])
-----------------------
The main class that wraps the asserted object and that you call matchers on.

To include a custom error message for failure cases, pass a string as the
second argument.

Most of the time you'll be using
[`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
occasionally you might want to assert `null`s or `undefined`s and in those
cases assigning `Must` to something like `expect` or `demand` works nicely.

**Examples**:
```javascript
true.must.be.true()
[].must.be.empty()

var expect = require("must")
expect(null).to.be.null()

var demand = require("must")
demand(undefined, "The undefined undefineds").be.undefined()
```

<a name="Must.prototype.a" />
### Must.prototype.a(class)
Alias of [`instanceof`](#Must.prototype.instanceof).  
Can also be used a pass-through property for a fluent chain.

**Examples**:
```javascript
"Hello".must.be.a.string()
new Date().must.be.a(Date)
```

<a name="Must.prototype.above" />
### Must.prototype.above(expected)
Assert that an object is above and greater than (`>`) `expected`.  
Uses `>` for comparison, so it'll also work with value objects (those
implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.

**Examples**:
```javascript
(69).must.be.above(42)
```

<a name="Must.prototype.after" />
### Must.prototype.after(expected)
Alias of [`above`](#Must.prototype.above).  
Works well with dates where saying *after* is more natural than *above* or
*greater than*.

To assert that a date is equivalent to another date, use
[`eql`](#Must.prototype.eql). For regular numbers,
[`equal`](#Must.prototype.equal) is fine.

**Examples**:
```javascript
(1337).must.be.after(42)
new Date(2030, 5, 18).must.be.after(new Date(2013, 9, 23))
```

<a name="Must.prototype.an" />
### Must.prototype.an(class)
Alias of [`instanceof`](#Must.prototype.instanceof).  
Can also be used a pass-through property for a fluent chain.

**Examples**:
```javascript
[1, 2].must.be.an.array()
new AwesomeClass().must.be.an(AwesomeClass)
```

<a name="Must.prototype.array" />
### Must.prototype.array()
Assert object is an array.

**Examples**:
```javascript
[42, 69].must.be.an.array()
```

<a name="Must.prototype.at" />
### Must.prototype.at
Pass-through property for a fluent chain.

**Examples**:
```javascript
(42).must.be.at.most(69)
(1337).must.be.at.least(1337)
```

<a name="Must.prototype.be" />
### Must.prototype.be(expected)
Alias of [`equal`](#Must.prototype.equal).  
Can also be used as a pass-through property for a fluent chain.

**Examples**:
```javascript
true.must.be.true()
(42).must.be(42)
```

<a name="Must.prototype.before" />
### Must.prototype.before(expected)
Alias of [`below`](#Must.prototype.below).  
Works well with dates where saying *before* is more natural than *below* or
*less than*.

To assert that a date is equivalent to another date, use
[`eql`](#Must.prototype.eql). For regular numbers,
[`equal`](#Must.prototype.equal) is fine.

**Examples**:
```javascript
(42).must.be.before(1337)
new Date(2000, 5, 18).must.be.before(new Date(2001, 0, 1))
```

<a name="Must.prototype.below" />
### Must.prototype.below(expected)
Assert that an object is below and less than (`<`) `expected`.  
Uses `<` for comparison, so it'll also work with value objects (those
implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.

**Examples**:
```javascript
(42).must.be.below(69)
```

<a name="Must.prototype.between" />
### Must.prototype.between(begin, end)
Assert that an object is between `begin` and `end` (inclusive).  
Uses `<` for comparison, so it'll also work with value objects (those
implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.

**Examples**:
```javascript
(13).must.be.between(13, 69)
(42).must.be.between(13, 69)
(69).must.be.between(13, 69)
```

<a name="Must.prototype.boolean" />
### Must.prototype.boolean()
Assert object is a boolean (`true` or `false`).  
Boxed boolean objects (`new Boolean`) are _not_ considered booleans.

**Examples**:
```javascript
true.must.be.a.boolean()
```

<a name="Must.prototype.contain" />
### Must.prototype.contain(expected)
Alias of [`include`](#Must.prototype.include).  

<a name="Must.prototype.date" />
### Must.prototype.date()
Assert object is a date.

**Examples**:
```javascript
new Date().must.be.a.date()
```

<a name="Must.prototype.empty" />
### Must.prototype.empty()
Assert that an object is empty.  
Checks either the `length` for arrays and strings or the count of
enumerable keys. Inherited keys also counted.

**Examples**:
```javascript
"".must.be.empty()
[].must.be.empty()
({}).must.be.empty()
```

<a name="Must.prototype.endWith" />
### Must.prototype.endWith(expected)
Assert a string ends with the given string.

**Examples**:
```javascript
"Hello, John".must.endWith("John")
```

<a name="Must.prototype.enumerable" />
### Must.prototype.enumerable(property)
Assert that an object has an enumerable property `property`.  
It will fail if the object lacks the property entirely.

This also checks inherited properties in the prototype chain, something which
`Object.prototype.propertyIsEnumerable` itself does not do.

For checking if a property exists *and* is non-enumerable, see
[`nonenumerable`](#Must.prototype.nonenumerable).

**Examples**:
```javascript
({life: 42, love: 69}).must.have.enumerable("love")
```

<a name="Must.prototype.enumerableProperty" />
### Must.prototype.enumerableProperty(property)
Alias of [`enumerable`](#Must.prototype.enumerable).  

<a name="Must.prototype.eql" />
### Must.prototype.eql(expected)
Assert object equality by content and if possible, recursively.  
Also handles circular and self-referential objects.

For most parts it asserts strict equality (`===`), but:
- `RegExp` objects are compared by their pattern and flags.
- `Date` objects are compared by their value.
- `Array` objects are compared recursively.
- `NaN`s are considered equivalent.
- Instances of the same class with a `valueOf` function are compared by its
  output.
- Plain objects and instances of the same class are compared recursively.

**Does not coerce types** so **mismatching types fail**.  
Inherited enumerable properties are also taken into account.

**Instances** are objects whose prototype's `constructor` property is set.
E.g. `new MyClass`.  
Others, like `{}` or `Object.create({})`, are **plain objects**.

**Examples**:
```javascript
/[a-z]/.must.eql(/[a-z]/)
new Date(1987, 5, 18).must.eql(new Date(1987, 5, 18))
["Lisp", 42].must.eql(["Lisp", 42])
({life: 42, love: 69}).must.eql({life: 42, love: 69})
NaN.must.eql(NaN)

function Answer(answer) { this.answer = answer }
new Answer(42).must.eql(new Answer(42))
```

<a name="Must.prototype.equal" />
### Must.prototype.equal(expected)
Assert object strict equality or identity (`===`).

To compare value objects (like `Date` or `RegExp`) by their value rather
than identity, use [`eql`](#Must.prototype.eql).  
To compare arrays and objects by content, also use
[`eql`](#Must.prototype.eql).

**Examples**:
```javascript
(42).must.equal(42)

var date = new Date
date.must.equal(date)
```

<a name="Must.prototype.error" />
### Must.prototype.error([constructor], [expected])
Assert that an object is an error (instance of `Error` by default).  
Optionally assert it matches `expected` (and/or is of instance
`constructor`).  
When you have a function that's supposed to throw, use
[`throw`](#Must.prototype.throw).

Given `expected`, the error is asserted as follows:
- A **string** is compared with the exception's `message` property.
- A **regular expression** is matched against the exception's `message`
  property.
- A **function** (a.k.a. constructor) is used to check if the error
  is an `instanceof` that constructor.
- All other cases of `expected` are left unspecified for now.

**Examples**:
```javascript
var err = throw new RangeError("Everything's amazing and nobody's happy") }
err.must.be.an.error()
err.must.be.an.error("Everything's amazing and nobody's happy")
err.must.be.an.error(/amazing/)
err.must.be.an.error(Error)
err.must.be.an.error(RangeError)
err.must.be.an.error(RangeError, "Everything's amazing and nobody's happy")
err.must.be.an.error(RangeError, /amazing/)
```

<a name="Must.prototype.eventually" />
### Must.prototype.eventually
Alias of [`resolve`](#Must.prototype.resolve).  

**Examples**:
```javascript
Promise.resolve(42).must.eventually.equal(42)
```

<a name="Must.prototype.exist" />
### Must.prototype.exist()
Assert object is exists and thereby is not null or undefined.

**Examples**:
```javascript
0.must.exist()
"".must.exist()
({}).must.exist()
```

<a name="Must.prototype.false" />
### Must.prototype.false()
Assert object is `false`.  
A boxed boolean object (`new Boolean(false`) is _not_ considered false.

**Examples**:
```javascript
false.must.be.false()
```

<a name="Must.prototype.falsy" />
### Must.prototype.falsy()
Assert object is falsy (`!obj`).

Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
Everything else is truthy.

**Examples**:
```javascript
0.must.be.falsy()
"".must.be.falsy()
```

<a name="Must.prototype.frozen" />
### Must.prototype.frozen()
Assert that an object is frozen with `Object.isFrozen`.

**Examples**:
```javascript
Object.freeze({}).must.be.frozen()
```

<a name="Must.prototype.function" />
### Must.prototype.function()
Assert object is a function.

**Examples**:
```javascript
(function() {}).must.be.a.function()
```

<a name="Must.prototype.gt" />
### Must.prototype.gt(expected)
Alias of [`above`](#Must.prototype.above).  

<a name="Must.prototype.gte" />
### Must.prototype.gte(expected)
Alias of [`least`](#Must.prototype.least).  

<a name="Must.prototype.have" />
### Must.prototype.have
Pass-through property for a fluent chain.

**Examples**:
```javascript
[1, 2].must.have.length(2)
```

<a name="Must.prototype.include" />
### Must.prototype.include(expected)
Assert object includes `expected`.

For strings it checks the text, for arrays it checks elements and for
objects the property values. Everything is checked with strict equals
(`===`).

**Examples**:
```javascript
"Hello, John!".must.include("John")
[1, 42, 3].must.include(42)
({life: 42, love: 69}).must.include(42)
```

<a name="Must.prototype.instanceOf" />
### Must.prototype.instanceOf(class)
Alias of [`instanceof`](#Must.prototype.instanceof).  

<a name="Must.prototype.instanceof" />
### Must.prototype.instanceof(class)
Assert that an object is an instance of something.  
Uses `obj instanceof expected`.

**Examples**:
```javascript
new Date().must.be.an.instanceof(Date)
```

<a name="Must.prototype.is" />
### Must.prototype.is(expected)
Alias of [`equal`](#Must.prototype.equal).  
Can also be used as a pass-through property for a fluent chain.

**Examples**:
```javascript
var claim = require("must")
claim(true).is.true()
claim(42).is(42)
```

<a name="Must.prototype.keys" />
### Must.prototype.keys(keys)
Assert that an object has only the expected enumerable `keys`.  
Pass an array of strings as `keys`.

Takes **inherited properties** into account. To not do so, see
[`ownKeys`](#Must.prototype.ownKeys).

**Examples**:
```javascript
({life: 42, love: 69}).must.have.keys(["life", "love"])
Object.create({life: 42}).must.have.keys(["life"])
```

<a name="Must.prototype.least" />
### Must.prototype.least(expected)
Assert that an object is at least, greater than or equal to (`>=`),
`expected`.  
Uses `>=` for comparison, so it'll also work with value objects (those
implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.

**Examples**:
```javascript
(69).must.be.at.least(42)
(42).must.be.at.least(42)
```

<a name="Must.prototype.length" />
### Must.prototype.length(expected)
Assert that an object has a length property equal to `expected`.

**Examples**:
```javascript
"Something or other".must.have.length(18)
[1, 2, 3, "Four o'clock rock"].must.have.length(4)
```

<a name="Must.prototype.lt" />
### Must.prototype.lt(expected)
Alias of [`below`](#Must.prototype.below).  

<a name="Must.prototype.lte" />
### Must.prototype.lte(expected)
Alias of [`most`](#Must.prototype.most).  

<a name="Must.prototype.match" />
### Must.prototype.match(regexp)
Assert object matches the given regular expression.

If you pass in a non regular expression object, it'll be converted to one
via `new RegExp(regexp)`.

**Examples**:
```javascript
"Hello, John!".must.match(/john/i)
"Wei wu wei".must.match("wu")
```

<a name="Must.prototype.most" />
### Must.prototype.most(expected)
Assert that an object is at most, less than or equal to (`<=`), `expected`.  
Uses `<=` for comparison, so it'll also work with value objects (those
implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.

**Examples**:
```javascript
(42).must.be.at.most(69)
(42).must.be.at.most(42)
```

<a name="Must.prototype.must" />
### Must.prototype.must
Pass-through property for a fluent chain.

**Examples**:
```javascript
(42).must.must.must.must.equal(42)
```

<a name="Must.prototype.nan" />
### Must.prototype.nan()
Assert object is `NaN`.

**Examples**:
```javascript
NaN.must.be.nan()
```

<a name="Must.prototype.nonenumerable" />
### Must.prototype.nonenumerable(property)
Assert that an object has a non-enumerable property `property`.  
It will fail if the object lacks the property entirely.

This also checks inherited properties in the prototype chain, something which
`Object.prototype.propertyIsEnumerable` itself does not do.

It's the inverse of [`enumerable`](#Must.prototype.enumerable).

**Examples**:
```javascript
(function() {}).must.have.nonenumerable("call")
Object.create({}, {love: {enumerable: 0}}).must.have.nonenumerable("love")
```

<a name="Must.prototype.nonenumerableProperty" />
### Must.prototype.nonenumerableProperty(property)
Alias of [`nonenumerable`](#Must.prototype.nonenumerable).  

<a name="Must.prototype.not" />
### Must.prototype.not
Inverse the assertion.  
Use it multiple times to create lots of fun!
`true.must.not.not.be.true()` :-)

**Examples**:
```javascript
true.must.not.be.true()
[].must.not.be.empty()
```

<a name="Must.prototype.null" />
### Must.prototype.null()
Assert object is `null`.

Because JavaScript does not allow method calls on `null`, you'll have to
wrap an expected null with [`Must`](#Must). Assigning `require("must")` to
`expect` or `demand` works well.

If you want to assert that an object's property is `null`, see
[`property`](#Must.prototype.property).

**Examples**:
```javascript
var demand = require("must")
demand(null).be.null()
```

<a name="Must.prototype.number" />
### Must.prototype.number()
Assert object is a number.  
Boxed number objects (`new Number`) are _not_ considered numbers.

**Examples**:
```javascript
(42).must.be.a.number()
```

<a name="Must.prototype.object" />
### Must.prototype.object()
Assert object is an.. object.

**Examples**:
```javascript
({}).must.be.an.object()
```

<a name="Must.prototype.own" />
### Must.prototype.own(property, [value])
Alias of [`ownProperty`](#Must.prototype.ownProperty).  

<a name="Must.prototype.ownKeys" />
### Must.prototype.ownKeys(keys)
Assert that an object has only the expected enumerable `keys` of its own.  
Pass an array of strings as `keys`.

**Does not** take **inherited properties** into account. To do so, see
[`keys`](#Must.prototype.keys).

**Examples**:
```javascript
({life: 42, love: 69}).must.have.ownKeys(["life", "love"])
```

<a name="Must.prototype.ownProperties" />
### Must.prototype.ownProperties(properties)
Assert that an object has all of the properties given in `properties` with
equal (`===`) values and that they're own properties.  In other words,
asserts that the given object is a subset of the one asserted against.

**Does not** take **inherited properties** into account. To do so, see
[`properties`](#Must.prototype.properties).

**Examples**:
```javascript
var john = {name: "John", age: 42, sex: "male"}
john.must.have.ownProperties({name: "John", sex: "male"})
```

<a name="Must.prototype.ownProperty" />
### Must.prototype.ownProperty(property, [value])
Assert that an object has own property `property`.  
Optionally assert it *equals* (`===`) to `value`.

**Does not** take **inherited properties** into account. To do so, see
[`property`](#Must.prototype.property).

**Examples**:
```javascript
({life: 42, love: 69}).must.have.ownProperty("love", 69)
```

<a name="Must.prototype.permutationOf" />
### Must.prototype.permutationOf(expected)
Assert that an array is a permutation of the given array.

An array is a permutation of another if they both have the same elements
(including the same number of duplicates) regardless of their order.
Elements are checked with strict equals (`===`).

**Examples**:
```javascript
[1, 1, 2, 3].must.be.a.permutationOf([3, 2, 1, 1])
[7, 8, 8, 9].must.not.be.a.permutationOf([9, 8, 7])
```

<a name="Must.prototype.properties" />
### Must.prototype.properties(properties)
Assert that an object has all of the properties given in `properties` with
equal (`===`) values.  In other words, asserts that the given object is
a subset of the one asserted against.

Takes **inherited properties** into account. To not do so, see
[`ownProperties`](#Must.prototype.ownProperties).

**Examples**:
```javascript
var john = {name: "John", age: 42, sex: "male"}
john.must.have.properties({name: "John", sex: "male"})
```

<a name="Must.prototype.property" />
### Must.prototype.property(property, [value])
Assert that an object has property `property`.  
Optionally assert it *equals* (`===`) to `value`.

Takes **inherited properties** into account. To not do so, see
[`ownProperty`](#Must.prototype.ownProperty).

**Examples**:
```javascript
(function() {}).must.have.property("call")
({life: 42, love: 69}).must.have.property("love", 69)
```

<a name="Must.prototype.regexp" />
### Must.prototype.regexp()
Assert object is a regular expression.

**Examples**:
```javascript
/[a-z]/.must.be.a.regexp()
```

<a name="Must.prototype.reject" />
### Must.prototype.reject
Makes any matcher following the use of `reject` wait till a promise
is rejected before asserting.  
Returns a new promise that will either resolve if the assertion passed or
fail with `AssertionError`.

Promises are transparent to matchers, so everything will also work with
customer matchers you've added to `Must.prototype`. Internally Must just
waits on the promise and calls the matcher function once it's rejected.

With [Mocha](http://mochajs.org), using this will look something like:

```javascript
it("must pass", function() {
  return Promise.reject(42).must.reject.to.equal(42)
})
```

Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
```javascript
it("must pass", function*() {
  yield Promise.reject(42).must.reject.to.equal(42)
  yield Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
})
```

**Examples**:
```javascript
Promise.reject(42).must.reject.to.equal(42)
Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
```

<a name="Must.prototype.resolve" />
### Must.prototype.resolve
Makes any matcher following the use of `resolve` wait till a promise
resolves before asserting.  
Returns a new promise that will either resolve if the assertion passed or
fail with `AssertionError`.

Promises are transparent to matchers, so everything will also work with
customer matchers you've added to `Must.prototype`. Internally Must just
waits on the promise and calls the matcher function once it's resolved.

With [Mocha](http://mochajs.org), using this will look something like:

```javascript
it("must pass", function() {
  return Promise.resolve(42).must.resolve.to.equal(42)
})
```

Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
```javascript
it("must pass", function*() {
  yield Promise.resolve(42).must.resolve.to.equal(42)
  yield Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
})
```

**Examples**:
```javascript
Promise.resolve(42).must.resolve.to.equal(42)
Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
```

<a name="Must.prototype.startWith" />
### Must.prototype.startWith(expected)
Assert a string starts with the given string.

**Examples**:
```javascript
"Hello, John".must.startWith("Hello")
```

<a name="Must.prototype.string" />
### Must.prototype.string()
Assert object is a string.  
Boxed string objects (`new String`) are _not_ considered strings.

**Examples**:
```javascript
"Hello".must.be.a.string()
```

<a name="Must.prototype.symbol" />
### Must.prototype.symbol()
Assert object is a symbol.

**Examples**:
```javascript
Symbol().must.be.a.symbol()
```

<a name="Must.prototype.the" />
### Must.prototype.the
Pass-through property for a fluent chain.

**Examples**:
```javascript
(42).must.be.the.number()
```

<a name="Must.prototype.then" />
### Must.prototype.then
Alias of [`resolve`](#Must.prototype.resolve).  

**Examples**:
```javascript
Promise.resolve(42).must.then.equal(42)
```

<a name="Must.prototype.throw" />
### Must.prototype.throw([constructor], [expected])
Assert that a function throws.  
Optionally assert it throws `expected` (and/or is of instance
`constructor`).  
When you already have an error reference, use
[`error`](#Must.prototype.error).

Given `expected`, the error is asserted as follows:
- A **string** is compared with the exception's `message` property.
- A **regular expression** is matched against the exception's `message`
  property.
- A **function** (a.k.a. constructor) is used to check if the error
  is an `instanceof` that constructor.
- All other cases of `expected` are left unspecified for now.

Because of how JavaScript works, the function will be called in `null`
context (`this`). If you want to test an instance method, bind it:
`obj.method.bind(obj).must.throw()`.

**Examples**:
```javascript
function omg() {
  throw new RangeError("Everything's amazing and nobody's happy")
}

omg.must.throw()
omg.must.throw("Everything's amazing and nobody's happy")
omg.must.throw(/amazing/)
omg.must.throw(Error)
omg.must.throw(RangeError)
omg.must.throw(RangeError, "Everything's amazing and nobody's happy")
omg.must.throw(RangeError, /amazing/)
```

<a name="Must.prototype.to" />
### Must.prototype.to
Pass-through property for a fluent chain.

**Examples**:
```javascript
var expect = require("must")
expect(true).to.be.true()

var wish = require("must")
wish(life).to.be.truthy()
```

<a name="Must.prototype.true" />
### Must.prototype.true()
Assert object is `true`.  
A boxed boolean object (`new Boolean(true`) is _not_ considered true.

**Examples**:
```javascript
true.must.be.true()
```

<a name="Must.prototype.truthy" />
### Must.prototype.truthy()
Assert object is truthy (`!!obj`).

Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
Everything else is truthy.

**Examples**:
```javascript
(42).must.be.truthy()
"Hello".must.be.truthy()
```

<a name="Must.prototype.undefined" />
### Must.prototype.undefined()
Assert object is `undefined`.

Because JavaScript does not allow method calls on `undefined`, you'll have to
wrap an expected undefined with [`Must`](#Must). Assigning `require("must")`
to `expect` or `demand` works well.

If you want to assert that an object's property is `undefined`, see
[`property`](#Must.prototype.property).

**Examples**:
```javascript
var demand = require("must")
demand(undefined).be.undefined()
```

<a name="Must.prototype.with" />
### Must.prototype.with
Pass-through property for a fluent chain.

**Examples**:
```javascript
Promise.resolve(42).must.resolve.with.number()
```


<a name="Object" />
Object
------


<a name="Object.prototype.must" />
### Object.prototype.must
Creates an instance of [`Must`](#Must) with the current object for asserting
and calling matchers on.

This property is non-enumerable just like built-in properties, so
it'll never interfere with any regular usage of objects.

Please note that JavaScript does not allow method calls on `null` or
`undefined`, so you'll sometimes have to call [`Must`](#Must) on them by
hand.  Assigning `require("must")` to `expect` or `demand` works well with
those cases.

**Examples**:
```javascript
true.must.be.true()
[].must.be.empty()
```


<a name="AssertionError" />
AssertionError(message, [options])
----------------------------------
Error object thrown when an assertion fails.

<a name="assertionError.actual" />
### assertionError.actual
The asserted object.

<a name="assertionError.diffable" />
### assertionError.diffable
Whether it makes sense to compare objects granularly or even show a diff
view of the objects involved.  

Most matchers (e.g. [`empty`](#Must.prototype.empty) and
[`string`](#Must.prototype.string)) are concrete, strict and atomic and
don't lend themselves to be compared property by property.  Others however,
like [`eql`](#Must.prototype.eql), are more granular and comparing them
line by line helps understand how they differ.

<a name="assertionError.expected" />
### assertionError.expected
If the matcher took an argument or asserted against something (like
`foo.must.be.true()`), then this is the expected value.

<a name="assertionError.showDiff" />
### assertionError.showDiff
Alias of [`diffable`](#assertionError.diffable).  
Some test runners (like [Mocha](http://visionmedia.github.io/mocha/)) expect
this property instead.

<a name="assertionError.stack" />
### assertionError.stack
The stack trace starting from the code that called `must`.
