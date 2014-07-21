Must.js API Documentation
=========================
### [Must](#Must)
- [a](#Must.prototype.a)(class)
- [above](#Must.prototype.above)(expected)
- [after](#Must.prototype.after)(expected)
- [an](#Must.prototype.an)(class)
- [array](#Must.prototype.array)()
- [at](#Must.prototype.at)
- [be](#Must.prototype.be)(expected)
- [before](#Must.prototype.before)(expected)
- [below](#Must.prototype.below)(expected)
- [between](#Must.prototype.between)(begin, end)
- [boolean](#Must.prototype.boolean)()
- [contain](#Must.prototype.contain)(expected)
- [date](#Must.prototype.date)()
- [empty](#Must.prototype.empty)()
- [enumerable](#Must.prototype.enumerable)(property)
- [enumerableProperty](#Must.prototype.enumerableProperty)(property)
- [eql](#Must.prototype.eql)(expected)
- [equal](#Must.prototype.equal)(expected)
- [exist](#Must.prototype.exist)()
- [false](#Must.prototype.false)()
- [falsy](#Must.prototype.falsy)()
- [frozen](#Must.prototype.frozen)()
- [function](#Must.prototype.function)()
- [gt](#Must.prototype.gt)(expected)
- [gte](#Must.prototype.gte)(expected)
- [have](#Must.prototype.have)
- [include](#Must.prototype.include)(expected)
- [instanceOf](#Must.prototype.instanceOf)(class)
- [instanceof](#Must.prototype.instanceof)(class)
- [is](#Must.prototype.is)(expected)
- [keys](#Must.prototype.keys)(keys)
- [least](#Must.prototype.least)(expected)
- [length](#Must.prototype.length)(expected)
- [lt](#Must.prototype.lt)(expected)
- [lte](#Must.prototype.lte)(expected)
- [match](#Must.prototype.match)(regexp)
- [most](#Must.prototype.most)(expected)
- [nonenumerable](#Must.prototype.nonenumerable)(property)
- [nonenumerableProperty](#Must.prototype.nonenumerableProperty)(property)
- [not](#Must.prototype.not)
- [null](#Must.prototype.null)()
- [number](#Must.prototype.number)()
- [object](#Must.prototype.object)()
- [own](#Must.prototype.own)(property, [value])
- [ownKeys](#Must.prototype.ownKeys)(keys)
- [ownProperty](#Must.prototype.ownProperty)(property, [value])
- [permutationOf](#Must.prototype.permutationOf)(expected)
- [property](#Must.prototype.property)(property, [value])
- [regexp](#Must.prototype.regexp)()
- [string](#Must.prototype.string)()
- [throw](#Must.prototype.throw)([constructor], [expected])
- [to](#Must.prototype.to)
- [true](#Must.prototype.true)()
- [truthy](#Must.prototype.truthy)()
- [undefined](#Must.prototype.undefined)()

### [Object](#Object)
- [must](#Object.prototype.must)

### [AssertionError](#AssertionError)
- [actual](#assertionError.actual)
- [diffable](#assertionError.diffable)
- [expected](#assertionError.expected)
- [showDiff](#assertionError.showDiff)
- [stack](#assertionError.stack)


<a name="Must" />
Must(actual)
------------
The main class that wraps the asserted object and that you call matchers on.

Most of the time you'll be using
[`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
occasionally you might want to assert `null`s or `undefined`s and in those
cases assigning `Must` to something like `expect` or `demand` works nicely.

**Examples**:
```javascript
true.must.be.true()
[].must.be.empty()

var expect = require("must")
expect(null).be.null()

var demand = require("must")
demand(undefined).be.undefined()
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
Considers boxed boolean objects (`new Boolean`) also booleans.

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
- `Boolean` objects are compared to boolean literals.
- `Number` objects are compared to number literals.
- `String` objects are compared to string literals.
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
Assert object is `false` or `new Boolean(false)`.

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
Considers boxed number objects (`new Number`) also numbers.

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

<a name="Must.prototype.string" />
### Must.prototype.string()
Assert object is a string.  
Considers boxed string objects (`new String`) also strings.

**Examples**:
```javascript
"Hello".must.be.a.string()
```

<a name="Must.prototype.throw" />
### Must.prototype.throw([constructor], [expected])
Assert that a function throws.  
Optionally assert it throws `expected` (of possibly instance `constructor`).

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
function omg() { throw new Error("Everything's amazing and nobody's happy") }
omg.must.throw()
omg.must.throw("Everything's amazing and nobody's happy")
omg.must.throw(/amazing/)
omg.must.throw(Error)
omg.must.throw(Error, "Everything's amazing and nobody's happy")
omg.must.throw(Error, /amazing/)
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
Assert object is `true` or `new Boolean(true)`.

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
