Must.js
=======
[![NPM version][npm-badge]](http://badge.fury.io/js/must)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-must)
[npm-badge]: https://badge.fury.io/js/must.png
[travis-badge]: https://travis-ci.org/moll/js-must.png?branch=master

Must.js is a testing and assertion library for JavaScript and Node.js with
a friendly **BDD** syntax (`awesome.must.be.true()`). It ships with **many
expressive matchers** and is **test runner and framework agnostic**. Follows
[RFC 2119][rfc2119] with its use of **MUST**. Good and well testsed stuff.

For those new to testing JavaScript on Node.js, you'll also need a test
framework (also called a test-runner or a harness) to run your tests. One such
tool is [Mocha][mocha].

[rfc2119]: https://www.ietf.org/rfc/rfc2119.txt
[mocha]: http://visionmedia.github.io/mocha

### Tour
- Assert with a **beautiful and fluent chain** that saves you from wrapping
  objects manually and reads nicely, too:
  ```javascript
  obj.must.be.true()
  ```

- Supports the **expect flavor** of wrapping as well:
  ```javascript
  var demand = require("must")
  demand(obj).be.string()
  ```

- **Many expressive matchers** out of the box, including:
  ```javascript
  [].must.be.empty()
  obj.must.have.nonenumerable("foo")
  (42).must.be.above(13)
  ```

- **Simple**, because **matchers always behave the same way** and don't depend
  on any "special flags" in the chain. They are also **not interdependent** the
  way `foo.should.have.property(x).with.lengthOf(5)` would be.

- **Reasonable**, because it asserts only when you call the matcher
  `[].must.be.empty()` and not when you merely get the property `empty`. See
  below why [asserting on property access](#asserting-on-property-access) is
  **dangerous** in other assertion libraries.

- Has an **intelligent and type-safe** recursive [`eql`][Must.prototype.eql]
  matcher that compares arrays and objects by content and supports value
  objects.  It's fully type-safe, so instances of *different classes* aren't
  *eql*, even if their properties are. It also supports **circular and
  self-referential** objects.
  ```javascript
  primesBelowTen.must.eql([2, 3, 5, 7])
  model.attributes.must.eql({title: "New", createdAt: new Date(2000, 1, 1)})
  ```

[Must.prototype.eql]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.eql

- **Human readable error messages** let you know if an object wasn't what you
  expected.

- Honors [RFC 2119][rfc2119] by using the word **MUST** because your
  tests assert things, they don't list wishes or prayers, right? Exactly!
  `Foo.must.equal(42)`, not `foo.pretty.please.equal(42)`.

- Works with any test runner and framework.  
- Avoids type coercions and mismatches.
- Well tested — over 750 cases in over 2500 lines of tests. That makes a test to
  code ratio of 5:1.

### Using Should.js or Chai.js? Switch for safety!
Among other things, one reason why [Should.js][should.js] and [Chai.js][chai.js]
inspired me to write Must.js is that they have a **fundamental design mistake**
that makes them both **surprising in a bad way** and **dangerous to use**. [Read
more below](#asserting-on-property-access).


Installing
----------
**Note**: Must.js will follow the [semantic versioning](http://semver.org/)
starting from v1.0.0.

### Installing on Node.js
```
npm install must
```

### Installing for the browser
Must.js doesn't yet have a build ready for the browser, but you might be able
to use [Browserify][browserify] to have it run there till then.

[browserify]: https://github.com/substack/node-browserify


Using
-----
To use the **fluent chain**, just require Must.js and it'll make itself
available everywhere:
```javascript
require("must")
```

Then just access the `must` property on any object and call matchers on it.
```javascript
answer.must.equal(42)
new Date().must.be.an.instanceof(Date)
```

If you wish to use the **expect flavor**, assign Must to any name of your
choice, e.g:
```javascript
var expect = require("must")
var demand = require("must")
```

And call it with the object you wish to assert:
```javascript
expect(answer).to.equal(42)
demand(null).be.null()
```

For a list of all matchers, please see the [Must.js API Documentation][api].
[api]: https://github.com/moll/js-must/blob/master/doc/API.md

### Negative asserting or matching the opposite
To assert the opposite, just add `not` between the chain:
```javascript
true.must.not.be.false()
[].must.not.be.empty()
```

Use it multiple times to create lots of fun puzzles! :-)
```javascript
true.must.not.not.be.true()
```

### Asserting on null and undefined values
In almost all cases you can freely call methods on any object in JavaScript.
Except for `null` and `undefined`.

Most of the time this won't be a problem, because if you're asserting that
`something.must.be.true()` and `something` ends up `null`, the test will still
fail. If, however, you do need to assert its nullness, aliasing Must to `expect`
or `demand` and wrapping it manually works well:
```javascript
var demand = require("must")
demand(something).be.null()
demand(undefined).be.undefined()
```

### Autoloading
If your test runner supports an options file, you might want to require Must
there so you wouldn't have to remember to `require` in each test file.

For [Mocha][mocha], that file is `test/mocha.opts`:
```
--require must
```

### Full example
Inside a test runner or framework things would look something like this:
```javascript
require("must")
var MySong = require("../my_song")

describe("MySong", function() {
  it("must be creatable", function() {
    new MySong().must.be.an.instanceof(MySong)
  })

  it("must have cowbell", function() {
    new MySong().cowbell.must.be.true()
  })

  it("must not have pop", function() {
    new MySong().must.not.have.property("pop")
  })
})
```


API
---
For extended documentation on all matchers and other objects that come with
Must.js, please see the [Must.js API Documentation][api].

### [Must](https://github.com/moll/js-must/blob/master/doc/API.md#Must)
- [a](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.a)(class)
- [above](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.above)(expected)
- [after](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.after)(expected)
- [an](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.an)(class)
- [array](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.array)()
- [at](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.at)
- [be](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.be)(expected)
- [before](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.before)(expected)
- [below](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.below)(expected)
- [between](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.between)(begin, end)
- [boolean](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.boolean)()
- [contain](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.contain)(expected)
- [date](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.date)()
- [empty](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.empty)()
- [enumerable](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.enumerable)(property)
- [enumerableProperty](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.enumerableProperty)(property)
- [eql](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.eql)(expected)
- [equal](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.equal)(expected)
- [exist](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.exist)()
- [false](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.false)()
- [falsy](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.falsy)()
- [frozen](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.frozen)()
- [function](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.function)()
- [gt](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.gt)(expected)
- [gte](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.gte)(expected)
- [have](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.have)
- [include](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.include)(expected)
- [instanceOf](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.instanceOf)(class)
- [instanceof](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.instanceof)(class)
- [is](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.is)(expected)
- [keys](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.keys)(keys)
- [least](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.least)(expected)
- [length](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.length)(expected)
- [lt](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.lt)(expected)
- [lte](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.lte)(expected)
- [match](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.match)(regexp)
- [most](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.most)(expected)
- [nonenumerable](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.nonenumerable)(property)
- [nonenumerableProperty](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.nonenumerableProperty)(property)
- [not](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.not)
- [null](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.null)()
- [number](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.number)()
- [object](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.object)()
- [own](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.own)(property, [value])
- [ownKeys](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.ownKeys)(keys)
- [ownProperty](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.ownProperty)(property, [value])
- [permutationOf](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.permutationOf)(expected)
- [property](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.property)(property, [value])
- [regexp](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.regexp)()
- [string](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.string)()
- [throw](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.throw)([constructor], [expected])
- [to](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.to)
- [true](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.true)()
- [truthy](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.truthy)()
- [undefined](https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.undefined)()


Migrating to Must.js
--------------------
You're likely to be already using some testing library and have a set of tests
in them. I'm **honored you picked** Must.js to go forward. Let's **get you up to
speed** on how Must.js differs from others and how to **migrate your old tests**
over.

### From Should.js
Must.js and [Should.js][should.js] are fairly similar when it comes to matchers.

- Just add parentheses after each assertion and you're almost set.
- Must.js does not have static matchers like `should.not.exist(obj.foo)`.  
  Convert to `demand(foo).not.to.exist()`.
- Must.js lacks `with.lengthOf` because its matchers are all independent.  
  Convert to `obj.must.have.length(5)`
- Must.js lacks the `ok` matcher because unambiguous names are better.  
  Convert to `truthy`.
- Must.js does not support custom error descriptions.

Here's a quick `sed` script to convert `obj.should.xxx` style to
`obj.must.xxx()`:
```
sed -i.should -E -f /dev/stdin test/**/*.js <<-end
  /\.should\.([[:alpha:].]+)([[:space:]}\);]|$)/s/\.should\.([[:alpha:].]+)/.must.\1()/g
  s/\.should\.([[:alpha:].]+)/.must.\1/g
end
```

### From Chai.js
Must.js and [Chai.js][chai.js] are fairly similar when it comes to matchers.

- Just add parentheses after each assertion and you're almost set.  
  That goes for both the BDD (`obj.should`) and *expect*
  (`expect(obj).to`) flavor.
- Must.js lacks the `include` flag because its matchers are all independent.  
  Convert to `Object.keys(obj).must.include("foo")`.
- Must.js lacks the `deep` flag for the `equal` matcher because
  [`eql`][Must.prototype.eql] already compares recursively and in a type-safe
  way.  
  Convert to `obj.must.eql({some: {deep: "object"}})`.
- Must.js lacks the `deep` flag for the `property` matcher because it prefers
  regular property access.  
  Convert to `obj.some.nested.property.must.equal(42)`.
- Must.js lacks the `ok` matcher because unambiguous names are better.  
  Convert to `truthy`.
- Must.js lacks the `respondTo` matcher because unambiguous names are better.  
  Convert to `MyClass.prototype.must.be.a.function()`.

Here's a quick `sed` script to convert `obj.should.xxx` style to
`obj.must.xxx()`:
```
sed -i.should -E -f /dev/stdin test/**/*.js <<-end
  /\.should\.([[:alpha:].]+)([[:space:]}\);]|$)/s/\.should\.([[:alpha:].]+)/.must.\1()/g
  s/\.should\.([[:alpha:].]+)/.must.\1/g
end
```

### Convert test case titles to MUST
If you've used the `should` style before, you most likely have test cases titled
`it("should do good")`.  
Migrate those to `it("must do good")` with this `sed` script:
```
sed -i.should -E -e 's/it\("should/it("must/g' test/**/*.js
```

<a name="asserting-on-property-access" />
### Beware of libraries that assert on property access
Among other things, one reason why [Should.js][should.js] and
[Chai.js][chai.js] inspired me to write Must.js is that they have
a **fundamental design mistake** that makes them both **surprising in a bad
way** and **dangerous to use**.

It has to do with them asserting on property access, like this:
```javascript
true.should.be.true
[].should.be.empty
```

What initially may seem familiar to Ruby programmers, first of all, is out of
place in JavaScript. Dot-something stands for getting a property's value and
getters, regardless of language, **should not** have **side-effects**.
Especially not **control-flow changing exceptions**!

Secondly, and this is where it's flat out **dangerous asserting on property
access**, is that accessing a non-existent property does **nothing** in
JavaScript.  Recall that JavaScript does not have Ruby's `method_missing` or
other hooks to catch such access. So, guess what happens when someone mistypes
or mis-remembers a matcher? Yep, nothin' again. And that's the way it's supposed
to be.  But what's good in JavaScript, **not so good** for your now **false
positive test**.

Imagine using a plugin that adds matchers for spies or mocks. Then using it with
`someFn.should.have.been.calledOnce`.  Someone accidentally removes the plugin
or thinks `calledQuadrice` sounds good?  Well, those assertions will surely
continue passing because they'll now just get `undefined` back.

Must.js **solves both problems** with the **simplest but effective solution**
— requires you to **always call matchers** because they're plain-old functions
— `expect(problem).to.not.exist()`.

[should.js]: https://github.com/visionmedia/should.js
[chai.js]: http://chaijs.com 


License
-------
Must.js is released under a *Lesser GNU Affero General Public License*, which in
summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find Must.js needs improving, please don't hesitate to type to me now at
[andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-must/issues
