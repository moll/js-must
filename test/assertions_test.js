var assert = require("assert")
var Must = require("..")

function assertFail(fn) { assert.throws(fn, Must.AssertionError) }
function assertPass(fn) { assert.doesNotThrow(fn) }

function mustThrowAssertionError(test, props) {
  describe("AssertionError", function() {
    it("must be thrown", function() {
      assert.throws(test, Must.AssertionError)
    })

    it("must have all properties", function() {
      try { test() }
      catch (ex) {
        assert.deepEqual(ex, props)
      }
    })

    it("must have correct stack trace", function() {
      try { test() }
      catch (ex) {
        var stack = ex.stack.split(/\r?\n/)
        assert(stack[0].match(/AssertionError/, "must include AssertionError"))
        assert(stack[1].match(/[\\\/]test[\\\/]/), "must have test at top")
      }
    })
  })
}

// Can't test an alias because getter functions apparently aren't aliased.
function mustPassA(name) {
  it("must return an instance of Must", function() {
    assert(true.must[name] instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { [].must.be[name].instanceof(Array) })
  })

  it("must be like Must.prototype.instanceof", function() {
    assertPass(function() { [].must.be[name](Array) })
    assertFail(function() { /a/.must.be[name](Array) })
  })

  it("must be bound", function() {
    assertPass(function() { [].must.be[name].call(null, Array) })
  })

  mustThrowAssertionError(function() { "".must.be[name](Array) }, {
    actual: "",
    expected: Array,
    message: "\"\" must be an instance of Array"
  })

  describe(".not", function() {
    function not() { [].must.not.be[name](Array) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    it("must carry over the current state", function() {
      assertFail(function() { true.must.not.be[name].truthy() })
    })

    mustThrowAssertionError(not, {
      actual: [],
      expected: Array,
      message: "[] must not be an instance of Array"
    })
  })
}

describe("Must.prototype.a", function() {
  mustPassA("a")
})

describe("Must.prototype.an", function() {
  mustPassA("an")
})

describe("Must.prototype.at", function() {
  it("must return an instance of Must", function() {
    assert(true.must.at instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { true.must.at.true() })
  })
})

function mustPassThroughToEqual(name) {
  it("must return an instance of Must", function() {
    assert(true.must[name] instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { true.must[name].true() })
  })

  it("must be like Must.prototype.equal", function() {
    assertPass(function() { false.must[name](false) })
    assertFail(function() { true.must[name](false) })

    assertPass(function() { (42).must[name](42) })
    assertFail(function() { (42).must[name](1337) })

    assertPass(function() { var obj = {}; obj.must[name](obj) })
    assertFail(function() { ({}).must[name]({}) })
  })

  it("must be bound", function() {
    assertPass(function() { (42).must[name].call(null, 42) })
  })

  mustThrowAssertionError(function() { true.must[name](42) }, {
    actual: true,
    expected: 42,
    message: "true must equal 42"
  })

  describe(".not", function() {
    function not() { true.must.not[name](true) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    it("must carry over the current state", function() {
      assertFail(function() { true.must.not[name].true() })
    })

    mustThrowAssertionError(not, {
      actual: true,
      expected: true,
      message: "true must not equal true"
    })
  })
}

describe("Must.prototype.be", function() {
  mustPassThroughToEqual("be")
})

describe("Must.prototype.is", function() {
  mustPassThroughToEqual("is")
})

describe("Must.prototype.have", function() {
  it("must return an instance of Must", function() {
    assert(true.must.have instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { true.must.have.true() })
  })
})

describe("Must.prototype.not", function() {
  it("must return an instance of Must", function() {
    assert(true.must.not instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { false.must.not.equal(true) })
  })

  it("must invert condition each time", function() {
    assertPass(function() { true.must.not.not.equal(true) })
  })

  it("must return a new instance of Must", function() {
    var must = true.must
    assert.notStrictEqual(must.not, must)
  })
})

describe("Must.prototype.to", function() {
  it("must return an instance of Must", function() {
    assert(true.must.to instanceof Must)
  })

  it("must carry over the current state", function() {
    assertPass(function() { true.must.to.true() })
  })
})

function mustPassTrue(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assertFail : assertPass
  var doesNotThrow = truthy ? assertPass : assertFail
  
  it("must "+pass+" given true literal", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must "+pass+" given true object", function() {
    doesNotThrow(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false literal", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must "+fail+" given false object", function() {
    throws(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must fail gracefully if null", function() {
    function test() { Must(null).be[name]() }
    assertFail(test, Must.AssertionError)
  })

  it("must fail gracefully if undefined", function() {
    function test() { Must(undefined).be[name]() }
    assertFail(test, Must.AssertionError)
  })

  it("must fail given zero number literal", function() {
    assertFail(function() { Must(0).be[name]() })
  })

  it("must fail given an empty string", function() {
    assertFail(function() { Must("").be[name]() })
  })

  it("must not do anything when not called as a function", function() {
    assertPass(function() { Must(!truthy).be[name] })
  })

  it("must be bound", function() {
    assertPass(function() { Must(truthy).be[name].call() })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    expected: truthy,
    message: !truthy + " must be " + truthy
  })

  describe(".not", function() {
    function not() { truthy.must.not.be[name]() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: truthy,
      expected: truthy,
      message: truthy + " must not be " + truthy
    })
  })
}

describe("Must.prototype.true", function() {
  mustPassTrue("true", true)
})

describe("Must.prototype.false", function() {
  mustPassTrue("false", false)
})

describe("Must.prototype.null", function() {
  it("must pass given null", function() {
    assertPass(function() { Must(null).be.null() })
  })

  it("must fail given true literal", function() {
    assertFail(function() { Must(true).be.null() })
  })

  it("must fail given false literal", function() {
    assertFail(function() { Must(false).be.null() })
  })

  it("must fail given undefined", function() {
    assertFail(function() { Must(undefined).be.null() })
  })

  it("must fail given empty string", function() {
    assertFail(function() { Must("").be.null() })
  })

  it("must not do anything when not called as a function", function() {
    assertPass(function() { Must(null).be.null })
  })

  it("must be bound", function() {
    assertPass(function() { Must(null).be.null.call() })
  })

  mustThrowAssertionError(function() { true.must.be.null() }, {
    actual: true,
    expected: null,
    message: "true must be null"
  })

  describe(".not", function() {
    function not() { Must(null).not.be.null() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: null,
      expected: null,
      message: "null must not be null"
    })
  })
})

describe("Must.prototype.undefined", function() {
  it("must pass given undefined", function() {
    assertPass(function() { Must(undefined).be.undefined() })
  })

  it("must fail given true literal", function() {
    assertFail(function() { Must(true).be.undefined() })
  })

  it("must fail given false literal", function() {
    assertFail(function() { Must(false).be.undefined() })
  })

  it("must fail given null", function() {
    assertFail(function() { Must(null).be.undefined() })
  })

  it("must fail given empty string", function() {
    assertFail(function() { Must("").be.undefined() })
  })

  it("must not do anything when not called as a function", function() {
    assertPass(function() { Must(undefined).be.undefined })
  })

  it("must be bound", function() {
    // When unbound, the value of actual is most likely to be undefined, so
    // test with a "not" in this case too.
    assertPass(function() { Must(undefined).be.undefined.call() })
    assertFail(function() { Must(null).be.undefined.call() })
  })

  mustThrowAssertionError(function() { true.must.be.undefined() }, {
    actual: true,
    expected: undefined,
    message: "true must be undefined"
  })

  describe(".not", function() {
    function not() { Must(undefined).not.be.undefined() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: undefined,
      expected: undefined,
      message: "undefined must not be undefined"
    })
  })
})

function mustPassType(name, msg, values, inspect) {
  var valid

  for (var type in values) !function(value) {
    if (valid == null) valid = value

    it("must pass given "+name+" "+type, function() {
      assertPass(function() { Must(value).be[name]() })
    })
  }(values[type])

  it("must fail given null", function() {
    assertFail(function() { Must(null).be[name]() })
  })

  it("must fail given undefined", function() {
    assertFail(function() { Must(undefined).be[name]() })
  })

  if (name != "boolean") it("must fail given true literal", function() {
    assertFail(function() { Must(true).be[name]() })
  })

  if (name != "boolean") it("must fail given false literal", function() {
    assertFail(function() { Must(false).be[name]() })
  })

  if (name != "number") it("must fail given number literal", function() {
    assertFail(function() { Must(0).be[name]() })
  })

  if (name != "string") it("must fail given string literal", function() {
    assertFail(function() { Must("").be[name]() })
  })

  it("must be bound", function() {
    assertPass(function() { Must(valid).be[name].call() })
  })

  mustThrowAssertionError(function() { Must(null).be[name]() }, {
    actual: null,
    message: "null must " + msg
  })

  describe(".not", function() {
    function not() { Must(valid).not.be[name]() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: valid,
      message: inspect + " must not " + msg
    })
  })
}

describe("Must.prototype.boolean", function() {
  mustPassType("boolean", "be a boolean", {
    "true literal": true,
    "false literal": false,
    "true object": new Boolean(true),
    "false object": new Boolean(false)
  }, "true")
})

describe("Must.prototype.number", function() {
  var dump = "0"
  mustPassType("number", "be a number", {literal: 0, object: new Number}, dump)
})

describe("Must.prototype.string", function() {
  var dump = "\"\""
  mustPassType("string", "be a string", {literal: "", object: new String}, dump)
})

describe("Must.prototype.regexp", function() {
  var dump = "/(?:)/"
  mustPassType("regexp", "be a regular expression", {object: new RegExp}, dump)
})

describe("Must.prototype.date", function() {
  var dump = "1970-01-01T00:00:00.000Z"
  mustPassType("date", "be a date", {object: new Date(0)}, dump)
})

describe("Must.prototype.array", function() {
  var dump = "[]"
  mustPassType("array", "be an array", {literal: [], object: new Array}, dump)
})

describe("Must.prototype.function", function() {
  var dump = "function () {}"
  mustPassType("function", "be a function", {object: function() {}}, dump)

  it("must pass given a function with changed __proto__", function() {
    function fn() {}
    fn.__proto__ = {}
    assertPass(function() { fn.must.be.function() })
  })
})

describe("Must.prototype.object", function() {
  var dump = "{}"
  mustPassType("object", "be an object", {object: new Object}, dump)
})

function mustPassTruthy(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assertFail : assertPass
  var doesNotThrow = truthy ? assertPass : assertFail

  it("must "+fail+" given null", function() {
    throws(function() { Must(null).be[name]() })
  })

  it("must "+fail+" given undefined", function() {
    throws(function() { Must(undefined).be[name]() })
  })

  describe("given Boolean", function() {
    it("must "+pass+" given true literal", function() {
      doesNotThrow(function() { Must(true).be[name]() })
    })

    it("must "+pass+" given true object", function() {
      doesNotThrow(function() { Must(new Boolean(true)).be[name]() })
    })

    it("must "+fail+" given false literal", function() {
      throws(function() { Must(false).be[name]() })
    })

    it("must "+pass+" given false object", function() {
      doesNotThrow(function() { Must(new Boolean(false)).be[name]() })
    })
  })

  describe("given Number", function() {
    it("must "+pass+" given literal", function() {
      doesNotThrow(function() { Must(1).be[name]() })
    })

    it("must "+pass+" given object", function() {
      doesNotThrow(function() { Must(new Number(1)).be[name]() })
    })

    it("must "+fail+" given zero literal", function() {
      throws(function() { Must(0).be[name]() })
    })

    it("must "+pass+" given zero object", function() {
      doesNotThrow(function() { Must(new Number(0)).be[name]() })
    })
  })

  describe("given String", function() {
    it("must "+pass+" given literal", function() {
      doesNotThrow(function() { Must("truthy").be[name]() })
    })

    it("must "+pass+" given object", function() {
      doesNotThrow(function() { Must(new String("truthy")).be[name]() })
    })

    it("must "+pass+" given zero literal", function() {
      doesNotThrow(function() { Must("0").be[name]() })
    })

    it("must "+pass+" given zero object", function() {
      doesNotThrow(function() { Must(new String("0")).be[name]() })
    })

    it("must "+fail+" given empty literal", function() {
      throws(function() { Must("").be[name]() })
    })

    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must(new String("")).be[name]() })
    })
  })

  describe("given RegExp", function() {
    it("must "+pass+" given regexp", function() {
      doesNotThrow(function() { Must(new RegExp).be[name]() })
    })
  })

  describe("given Date", function() {
    it("must "+pass+" given date", function() {
      doesNotThrow(function() { Must(new Date(0)).be[name]() })
    })
  })

  describe("given Array", function() {
    it("must "+pass+" given empty array", function() {
      doesNotThrow(function() { Must(new Array).be[name]() })
    })
  })

  describe("given Function", function() {
    it("must "+pass+" given function", function() {
      doesNotThrow(function() { Must(new Function).be[name]() })
    })
  })

  describe("given Object", function() {
    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must(new Object).be[name]() })
    })
  })

  it("must not do anything when not called as a function", function() {
    assertPass(function() { Must(!truthy).be[name] })
  })

  it("must be bound", function() {
    assertPass(function() { Must(truthy).be[name].call() })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    message: !truthy + " must be " + name
  })

  describe(".not", function() {
    function not() { truthy.must.not.be[name]() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: truthy,
      message: truthy + " must not be " + name
    })
  })
}

describe("Must.prototype.truthy", function() {
  mustPassTruthy("truthy", true)
})

describe("Must.prototype.falsy", function() {
  mustPassTruthy("falsy", false)
})

describe("Must.prototype.exist", function() {
  it("must fail if null", function() {
    assertFail(function() { Must(null).exist() })
  })

  it("must fail if undefined", function() {
    assertFail(function() { Must(undefined).exist() })
  })

  it("must pass if true", function() {
    assertPass(function() { Must(true).exist() })
  })

  it("must pass if false", function() {
    assertPass(function() { Must(false).exist() })
  })

  it("must pass if an object", function() {
    assertPass(function() { Must({}).exist() })
  })

  it("must be bound", function() {
    assertPass(function() { true.must.exist.call() })
  })

  mustThrowAssertionError(function() { Must(null).exist() }, {
    actual: null,
    message: "null must exist"
  })

  describe(".not", function() {
    function not() { true.must.not.exist() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: true,
      message: "true must not exist"
    })
  })
})

describe("Must.prototype.instanceof", function() {
  describe("given Boolean", function() {
    it("must fail given boolean literal", function() {
      assertFail(function() { true.must.be.instanceof(Boolean) })
      assertFail(function() { false.must.be.instanceof(Boolean) })
    })

    it("must pass given boolean object", function() {
      assertPass(function() {
        Must(new Boolean()).be.instanceof(Boolean)
      })
    })

    it("must fail given Boolean constructor", function() {
      assertFail(function() { Boolean.must.be.instanceof(Boolean) })
    })
  })

  describe("given Number", function() {
    it("must fail given number literal", function() {
      assertFail(function() { Must(42).be.instanceof(Number) })
    })

    it("must pass given number object", function() {
      assertPass(function() {
        Must(new Number()).be.instanceof(Number)
      })
    })

    it("must fail given Number constructor", function() {
      assertFail(function() { Number.must.be.instanceof(Number) })
    })
  })

  describe("given String", function() {
    it("must fail given string literal", function() {
      assertFail(function() { Must("").be.instanceof(String) })
    })

    it("must pass given string object", function() {
      assertPass(function() {
        Must(new String()).be.instanceof(String)
      })
    })

    it("must fail given String constructor", function() {
      assertFail(function() { String.must.be.instanceof(String) })
    })
  })

  describe("given Array", function() {
    it("must pass given array", function() {
      assertPass(function() { [].must.be.instanceof(Array) })
    })

    it("must fail given Array constructor", function() {
      assertFail(function() { Array.must.be.instanceof(Array) })
    })
  })

  describe("given Function", function() {
    it("must pass given function object", function() {
      assertPass(function() {
        Must(new Function).be.instanceof(Function) 
      })
    })

    it("must pass given Function constructor", function() {
      assertPass(function() { Function.must.be.instanceof(Function) })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() {}

    it("must pass given an instance of it", function() {
      assertPass(function() { new Foo().must.be.instanceof(Foo) })
    })

    it("must pass given an instance of it and Object", function() {
      assertPass(function() { new Foo().must.be.instanceof(Object) })
    })

    it("must fail given an instance of another", function() {
      assertFail(function() { new Bar().must.be.instanceof(Foo) })
    })
  })

  it("must be bound", function() {
    assertPass(function() { [].must.be.instanceof.call(null, Array) })
  })

  mustThrowAssertionError(function() { [].must.be.instanceof(String) }, {
    actual: [],
    expected: String,
    message: "[] must be an instance of String"
  })

  describe(".not", function() {
    function not() { [].must.not.be.instanceof(Array) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: [],
      expected: Array,
      message: "[] must not be an instance of Array"
    })
  })
})

describe("Must.prototype.instanceOf", function() {
  it("must be an alias of Must.prototype.instanceof", function() {
    assert.strictEqual(Must.prototype.instanceOf, Must.prototype.instanceof)
  })
})

describe("Must.prototype.equal", function() {
  it("must pass given nulls", function() {
    assertPass(function() { Must(null).be.equal(null) })
  })

  it("must pass given undefineds", function() {
    assertPass(function() { Must(undefined).be.equal(undefined) })
  })

  it("must fail given null and undefined", function() {
    assertFail(function() { Must(null).be.equal(undefined) })
  })

  it("must fail given undefined and null", function() {
    assertFail(function() { Must(undefined).be.equal(null) })
  })

  describe("given Boolean", function() {
    function mustPassTrueEqual(bool) {
      it("must pass given "+bool+" literals", function() {
        assertPass(function() { Must(bool).be.equal(bool) })
      })

      it("must fail given "+bool+" literal and object", function() {
        assertFail(function() { Must(bool).be.equal(new Boolean(bool)) })
        assertFail(function() { Must(new Boolean(bool)).be.equal(bool) })
      })

      it("must fail given "+bool+" literal with "+!bool, function() {
        assertFail(function() { Must(bool).be.equal(!bool) })
      })
    }

    mustPassTrueEqual(true)
    mustPassTrueEqual(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent literals", function() {
      assertPass(function() { Must(42).be.equal(42) })
    })

    it("must fail given unequivalent literals", function() {
      assertFail(function() { Must(42).be.equal(1337) })
    })

    it("must fail given equivalent literal and object", function() {
      assertFail(function() { Must(42).be.equal(new Number(42)) })
      assertFail(function() { Must(new Number(42)).be.equal(42) })
    })

    it("must fail given string", function() {
      assertFail(function() { Must(42).be.equal("42") })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent literals", function() {
      assertPass(function() { Must("ok").be.equal("ok") })
    })

    it("must fail given unequivalent literals", function() {
      assertFail(function() { Must("ok").be.equal("nok") })
    })

    it("must fail given equivalent literal and object", function() {
      assertFail(function() { Must("ok").be.equal(new String("ok")) })
      assertFail(function() { Must(new String("ok")).be.equal("ok") })
    })

    it("must fail given number", function() {
      assertFail(function() { Must("42").be.equal(42) })
    })
  })

  describe("given RegExp", function() {
    it("must fail given equivalent regexps", function() {
      assertFail(function() { Must(/a/).be.equal(/a/) })
    })

    it("must fail given unequivalent regexps", function() {
      assertFail(function() { Must(/a/).be.equal(/b/) })
    })

    it("must pass given identical regexps", function() {
      var regexp = new RegExp
      assertPass(function() { Must(regexp).be.equal(regexp) })
    })

    it("must fail given equivalent regexps", function() {
      assertFail(function() { Must(new RegExp).be.equal(new RegExp) })
    })
  })

  describe("given Date", function() {
    it("must pass given identical dates", function() {
      var now = new Date
      assertPass(function() { Must(now).be.equal(now) })
    })

    it("must fail given equivalent dates", function() {
      assertFail(function() { Must(new Date(42)).be.equal(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must fail given equivalent arrays", function() {
      assertFail(function() { Must([1]).be.equal([1]) })
    })

    it("must pass given identical arrays", function() {
      var array = new Array
      assertPass(function() { Must(array).be.equal(array) })
    })

    it("must fail given unidentical arrays", function() {
      assertFail(function() { Must(new Array).be.equal(new Array) })
    })
  })

  describe("given Function", function() {
    it("must pass given identical functions", function() {
      var fn = new Function
      assertPass(function() { Must(fn).be.equal(fn) })
    })

    it("must fail given equivalent functions", function() {
      assertFail(function() {
        Must(new Function("foo")).be.equal(new Function("foo")) 
      })
    })
  })

  it("must be bound", function() {
    assertPass(function() { true.must.equal.call(null, true) })
  })

  mustThrowAssertionError(function() { "secret".must.equal(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must equal 42"
  })

  describe(".not", function() {
    function not() { "secret".must.not.equal("secret") }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: "secret",
      expected: "secret",
      message: "\"secret\" must not equal \"secret\""
    })
  })
})

describe("Must.prototype.eql", function() {
  it("must pass given nulls", function() {
    assertPass(function() { Must(null).be.eql(null) })
  })

  it("must pass given undefineds", function() {
    assertPass(function() { Must(undefined).be.eql(undefined) })
  })

  it("must fail given null and undefined", function() {
    assertFail(function() { Must(null).be.eql(undefined) })
    assertFail(function() { Must(undefined).be.eql(null) })
  })

  it("must fail given an empty array and empty object", function() {
    // Can't think of an assertion library that would be nuts enough to consider
    // {} equivalent to []. Oh yeah, I can! For fucks sake, this is reason #42
    // why Must.js is better!
    assertFail(function() { Must({}).be.eql([]) })
  })

  describe("given Boolean", function() {
    function mustPassTrueEql(bool) {
      it("must pass given "+bool+" literals", function() {
        assertPass(function() { Must(bool).be.eql(bool) })
      })

      it("must pass given "+bool+" literal and object", function() {
        assertPass(function() { Must(bool).be.eql(new Boolean(bool)) })
        assertPass(function() { Must(new Boolean(bool)).be.eql(bool) })
      })

      it("must fail given "+bool+" literal with "+!bool, function() {
        assertFail(function() { Must(bool).be.eql(!bool) })
      })
    }

    mustPassTrueEql(true)
    mustPassTrueEql(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent literals", function() {
      assertPass(function() { Must(42).be.eql(42) })
    })

    it("must pass given equivalent literal and object", function() {
      assertPass(function() { Must(42).be.eql(new Number(42)) })
      assertPass(function() { Must(new Number(42)).be.eql(42) })
    })

    it("must fail given unequivalent literals", function() {
      assertFail(function() { Must(42).be.eql(1337) })
    })

    it("must fail given string", function() {
      assertFail(function() { Must(42).eql("42") })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent literals", function() {
      assertPass(function() { Must("ok").be.eql("ok") })
    })

    it("must pass given equivalent literal and object", function() {
      assertPass(function() { Must("ok").be.eql(new String("ok")) })
      assertPass(function() { Must(new String("ok")).be.eql("ok") })
    })

    it("must fail given unequivalent literals", function() {
      assertFail(function() { Must("ok").be.eql("nok") })
    })

    it("must fail given equivalent number literal", function() {
      assertFail(function() { Must("1").be.eql(1) })
    })

    it("must fail given equivalent number object", function() {
      assertFail(function() { Must("1").be.eql(new Number(1)) })
    })

    it("must fail given number", function() {
      assertFail(function() { Must("42").eql(42) })
    })
  })

  describe("given RegExp", function() {
    it("must pass given equivalent literals", function() {
      assertPass(function() { Must(/a/).be.eql(/a/) })
    })

    it("must fail given unequivalent literals", function() {
      assertFail(function() { Must(/a/).be.eql(/b/) })
    })

    it("must pass given equivalent objects", function() {
      assertPass(function() { Must(new RegExp).be.eql(new RegExp) })
    })

    it("must fail given unequivalent objects", function() {
      assertFail(function() {Must(new RegExp("a")).be.eql(new RegExp("b"))})
    })
  })

  describe("given Date", function() {
    it("must pass given identical dates", function() {
      var now = new Date
      assertPass(function() { Must(now).be.eql(now) })
    })

    it("must pass given equivalent dates", function() {
      assertPass(function() { Must(new Date(7)).be.eql(new Date(7)) })
    })

    it("must fail given unequivalent dates", function() {
      assertFail(function() { Must(new Date(69)).be.eql(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must pass empty equivalent arrays", function() {
      assertPass(function() { Must([]).be.eql([]) })
    })

    it("must pass given equivalent arrays", function() {
      assertPass(function() { Must([1]).be.eql([1]) })
    })

    it("must pass given identical arrays", function() {
      var array = new Array
      assertPass(function() { Must(array).be.eql(array) })
    })

    it("must fail given an empty and non-empty array", function() {
      assertFail(function() { Must([]).be.eql([1]) })
      assertFail(function() { Must([1]).be.eql([]) })
    })

    it("must fail given a smaller and a larger array", function() {
      assertFail(function() { Must([1]).be.eql([1, 2]) })
      assertFail(function() { Must([1, 2]).be.eql([1]) })
    })

    it("must pass given equivalent nested arrays", function() {
      assertPass(function() { Must([1, [2], 3]).be.eql([1, [2], 3]) })
    })

    it("must fail given equivalent nested arrays", function() {
      assertFail(function() { Must([1, [2], 3]).be.eql([1, [42], 3]) })
    })
  })

  describe("given Function", function() {
    it("must pass given identical functions", function() {
      var fn = new Function
      assertPass(function() { Must(fn).be.eql(fn) })
    })

    it("must fail given equivalent objects", function() {
      assertFail(function() {
        Must(new Function("foo")).be.eql(new Function("foo")) 
      })
    })
  })

  describe("given Object", function() {
    it("must pass given identical objects", function() {
      var a = {a: 42, b: 69}
      var b = {a: 42, b: 69}
      assertPass(function() { Must(a).be.eql(b) })
    })

    it("must pass given empty objects", function() {
      assertPass(function() { Must({}).be.eql({}) })
    })

    it("must fail given an empty and filled object", function() {
      assertFail(function() { Must({}).be.eql({a: 42}) })
      assertFail(function() { Must({a: 42}).be.eql({}) })
    })

    it("must fail given a smaller and larger object", function() {
      assertFail(function() { Must({a: 42, b: 69}).be.eql({a: 42}) })
      assertFail(function() { Must({a: 42}).be.eql({a: 42, b: 69}) })
    })

    it("must pass given equivalent objects", function() {
      assertPass(function() { Must({a: 42, b: 69}).be.eql({a: 42, b: 69}) })
    })

    it("must fail given objects with differently typed properties", function() {
      assertFail(function() {Must({a: "42", b: 69}).be.eql({a: 42, b: 69})})
    })

    it("must pass given an object with set constructor property", function() {
      var a = {constructor: 1337}
      var b = {constructor: 1337}
      assertPass(function() { Must(a).be.eql(b) })
    })

    it("must pass given a deep object", function() {
      var a = {life: {love: 69}}
      var b = {life: {love: 69}}
      assertPass(function() { Must(a).be.eql(b) })
    })

    describe("given inherited objects", function() {
      it("must pass given empty inherited objects", function() {
        var a = Object.create({})
        var b = Object.create({})
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given empty ancestored objects", function() {
        var a = Object.create(Object.create({}))
        var b = Object.create(Object.create({}))
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given empty objects inherited from null", function() {
        var a = Object.create(null)
        var b = Object.create(null)
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given empty objects ancestored from null", function() {
        var a = Object.create(Object.create(null))
        var b = Object.create(Object.create(null))
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given equivalent inherited objects", function() {
        var a = Object.create({love: 42})
        var b = Object.create({love: 42})
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given equivalent ancestored objects", function() {
        var a = Object.create(Object.create({love: 42}))
        var b = Object.create(Object.create({love: 42}))
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given equivalent objects inherited from null", function() {
        var a = Object.create(null, {life: {value: 42, enumerable: true}})
        var b = Object.create(null, {life: {value: 42, enumerable: true}})
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must pass given equivalent objects ancestored from null", function() {
        var a = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))
        var b = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))
        assertPass(function() { Must(a).be.eql(b) })
      })

      it("must fail given equivalent inherited objects", function() {
        var a = Object.create({love: 42})
        var b = Object.create({love: 69})
        assertFail(function() { Must(a).be.eql(b) })
      })

      it("must fail given equivalent ancestored objects", function() {
        var a = Object.create(Object.create({love: 42}))
        var b = Object.create(Object.create({love: 69}))
        assertFail(function() { Must(a).be.eql(b) })
      })

      it("must fail given equivalent objects inherited from null", function() {
        var a = Object.create(null, {life: {value: 42, enumerable: true}})
        var b = Object.create(null, {life: {value: 69, enumerable: true}})
        assertFail(function() { Must(a).be.eql(b) })
      })

      it("must fail given equivalent objects ancestored from null", function() {
        var a = Object.create(Object.create(null, {
          life: {value: 42, enumerable: true}
        }))
        var b = Object.create(Object.create(null, {
          life: {value: 69, enumerable: true}
        }))
        assertFail(function() { Must(a).be.eql(b) })
      })
    })
  })

  describe("given instance", function() {
    it("must fail given equivalent instances", function() {
      function Priceless(value) { this.value }
      var a = new Priceless(42), b = new Priceless(42)
      assertFail(function() { Must(a).eql(b) })
    })

    it("must fail given different instances", function() {
      assertFail(function() { Must(new new Function).eql(new new Function) })
    })

    describe("given valueOf", function() {
      it("must pass given identical output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable(42)
        assertPass(function() { Must(a).eql(b) })
      })

      it("must fail given unequivalent output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable(69)
        assertFail(function() { Must(a).eql(b) })
      })

      it("must fail given differently typed output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable("42")
        assertFail(function() { Must(a).eql(b) })
      })

      it("must fail given identical output from different instances",
        function() {
        function A(value) { this.value }
        A.prototype.valueOf = function() { return this.value }
        function B(value) { this.value }
        B.prototype.valueOf = function() { return this.value }
        assertFail(function() { Must(new A(42)).eql(new B(42)) })
      })

      it("must fail given identical output from different instances with set constructor property", function() {
        function A(value) { this.value }
        A.prototype.valueOf = function() { return this.value }
        function B(value) { this.value }
        B.prototype.valueOf = function() { return this.value }

        var a = new A(42)
        var b = new B(42)
        a.constructor = b.constructor = function() {}
        assertFail(function() { Must(a).eql(b) })
      })
    })
  })

  it("must be bound", function() {
    assertPass(function() { [].must.eql.call(null, []) })
  })

  mustThrowAssertionError(function() { "secret".must.eql(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must be equivalent to 42"
  })

  describe(".not", function() {
    function not() { "secret".must.not.eql("secret") }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: "secret",
      expected: "secret",
      message: "\"secret\" must not be equivalent to \"secret\""
    })
  })
})

describe("Must.prototype.empty", function() {
  describe("given Boolean", function() {
    it("must fail given a true literal", function() {
      assertFail(function() { Must(true).be.empty() })
    })

    it("must fail given a false literal", function() {
      assertFail(function() { Must(false).be.empty() })
    })

    it("must pass given a true object", function() {
      assertPass(function() { Must(new Boolean(true)).be.empty() })
    })

    it("must pass given a false object", function() {
      assertPass(function() { Must(new Boolean(false)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Boolean(false)
      obj.life = 42
      assertFail(function() { Must(obj).be.empty() })
    })
  })

  describe("given Number", function() {
    it("must fail given an zero literal", function() {
      assertFail(function() { Must(0).be.empty() })
    })

    it("must fail given a non-zero literal", function() {
      assertFail(function() { Must(1).be.empty() })
    })

    it("must pass given a zero object", function() {
      assertPass(function() { Must(new Number).be.empty() })
    })

    it("must pass given a non-zero object", function() {
      assertPass(function() { Must(new Number(1)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Number(1)
      obj.life = 42
      assertFail(function() { Must(obj).be.empty() })
    })
  })

  describe("given String", function() {
    it("must pass given an empty literal", function() {
      assertPass(function() { Must("").be.empty() })
    })

    it("must fail given a non-empty literal", function() {
      assertFail(function() { Must("a").be.empty() })
    })

    it("must pass given an empty object", function() {
      assertPass(function() { Must(new String).be.empty() })
    })

    it("must fail given a non-empty object", function() {
      assertFail(function() { Must(new String("a")).be.empty() })
    })
  })

  describe("given RegExp", function() {
    it("must pass given an empty object", function() {
      assertPass(function() { Must(new RegExp).be.empty() })
    })

    it("must pass given a non-empty object", function() {
      assertPass(function() { Must(new RegExp("a")).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new RegExp("a")
      obj.life = 42
      assertFail(function() { Must(obj).be.empty() })
    })
  })

  describe("given Array", function() {
    it("must pass given an empty literal", function() {
      assertPass(function() { Must([]).be.empty() })
    })

    it("must fail given a non-empty literal", function() {
      assertFail(function() { Must([1]).be.empty() })
    })
  })

  describe("given Function", function() {
    it("should pass given an empty object", function() {
      assertPass(function() { Must(new Function).be.empty() })
    })

    it("should pass given a non-empty object", function() {
      assertPass(function() { Must(new Function("a")).be.empty() })
    })

    it("should fail given a non-empty object with keys", function() {
      var obj = new Function("a")
      obj.life = 42
      assertFail(function() { Must(obj).be.empty() })
    })
  })

  describe("given Object", function() {
    it("must pass given an empty object", function() {
      assertPass(function() { Must({}).be.empty() })
    })

    it("must fail given a non-empty object", function() {
      assertFail(function() { Must({life: 42}).be.empty() })
    })

    it("must fail given a non-empty inherited object", function() {
      assertFail(function() { Must(Object.create({life: 42})).be.empty() })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() { this.life = 42 }

    it("must pass given an empty instance", function() {
      assertPass(function() { new Foo().must.be.empty() })
    })

    it("must fail given a non-empty instance", function() {
      assertFail(function() { new Bar().must.be.empty() })
    })
  })

  it("must be bound", function() {
    assertPass(function() { [].must.be.empty.call() })
  })

  mustThrowAssertionError(function() { [1].must.be.empty() }, {
    actual: [1],
    message: "[1] must be empty"
  })

  describe(".not", function() {
    function not() { [].must.not.be.empty() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: [],
      message: "[] must not be empty"
    })
  })
})

describe("Must.prototype.include", function() {
  describe("given String", function() {
    var literal = "Hello! How are you?"
    var object = new String(literal)

    it("must pass if given string literal includes string literal", function() {
      assertPass(function() { Must(literal).include("How") })
    })

    it("must fail if given string literal does not include string literal",
      function() {
      assertFail(function() { Must(literal).include("good") })
    })

    it("must pass if given string literal includes string object", function() {
      assertPass(function() {
        Must(literal).include(new String("How")) 
      })
    })

    it("must fail if given string literal does not include string object",
      function() {
      assertFail(function() { Must(literal).include(new String("good")) })
    })

    it("must pass if given string object includes string literal", function() {
      assertPass(function() { Must(object).include("How") })
    })

    it("must fail if given string object does not include string literal",
      function() {
      assertFail(function() { Must(object).include("good") })
    })

    it("must pass if given string object includes string object", function() {
      assertPass(function() {Must(object).include(new String("How"))})
    })

    it("must fail if given string object does not include string object",
      function() {
      assertFail(function() { Must(object).include(new String("good")) })
    })
  })

  describe("given Array", function() {
    it("must pass if given array includes number literal", function() {
      assertPass(function() { [1, 2, 3].must.include(2) })
    })

    it("must fail if given array does not include number literal", function() {
      assertFail(function() { [1, 2, 3].must.include(42) })
    })

    it("must fail if given array includes equivalent number", function() {
      assertFail(function() { [1, 2, 3].must.include(new Number(2)) })
    })
  })

  describe("given Object", function() {
    it("must pass if given object includes number literal", function() {
      assertPass(function() { ({a: 1, b: 2, c: 3}).must.include(2) })
    })

    it("must fail if given array does not include number literal", function() {
      assertFail(function() { ({a: 1, b: 2, c: 3}).must.include(42) })
    })

    it("must fail if given array includes equivalent number", function() {
      var obj = ({a: 1, b: 2, c: 3})
      assertFail(function() { obj.must.include(new Number(2)) })
    })
  })

  it("must be bound", function() {
    assertPass(function() { [1, 2, 3].must.include.call(null, 2) })
  })

  mustThrowAssertionError(function() { [1, 2, 3].must.include(42) }, {
    actual: [1, 2, 3],
    expected: 42,
    message: "[1,2,3] must include 42"
  })

  describe(".not", function() {
    function not() { [1, 42, 3].must.not.include(42) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: [1, 42, 3],
      expected: 42,
      message: "[1,42,3] must not include 42"
    })
  })
})

describe("Must.prototype.match", function() {
  describe("given String and RegExp", function() {
    var literal = "Year 2014 might be like 1984."
    var object = new String(literal)

    it("must pass if given string literal matches", function() {
      assertPass(function() { Must(literal).match(/^Year \d+ might/) })
    })

    it("must fail if given string literal does not match", function() {
      assertFail(function() { Must(literal).match(/^\d+ might/) })
    })

    it("must pass if given string object matches", function() {
      assertPass(function() { Must(object).match(/^Year \d+ might/) })
    })

    it("must fail if given string object does not match",
      function() {
      assertFail(function() { Must(object).match(/^\d+ might/) })
    })
  })

  describe("given String and String", function() {
    var literal = "Year 2014 might be like 1984."
    var object = new String(literal)

    it("must pass if given string literal matches", function() {
      assertPass(function() {Must(literal).match("^Year \\d+ might")})
    })

    it("must fail if given string literal does not match", function() {
      assertFail(function() { Must(literal).match("^\\d+ might") })
    })

    it("must pass if given string object matches", function() {
      assertPass(function() { Must(object).match("^Year \\d+ might") })
    })

    it("must fail if given string object does not match",
      function() {
      assertFail(function() { Must(object).match("^\\d+ might") })
    })

    mustThrowAssertionError(function() { "1984".must.match("^2014$") }, {
      actual: "1984",
      expected: /^2014$/,
      message: "\"1984\" must match /^2014$/"
    })
  })

  it("must be bound", function() {
    assertPass(function() { "abcd".must.match.call(null, /b/) })
  })

  mustThrowAssertionError(function() { "1984".must.match(/^2014$/) }, {
    actual: "1984",
    expected: /^2014$/,
    message: "\"1984\" must match /^2014$/"
  })

  describe(".not", function() {
    function not() { "1984".must.not.match(/^1984$/) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: "1984",
      expected: /^1984$/,
      message: "\"1984\" must not match /^1984$/"
    })
  })
})

describe("Must.prototype.throw", function() {
  describe("given nothing", function() {
    it("must pass if function throws", function() {
      assertPass(function() { !function() { throw 5 }.must.throw() })
    })

    it("must pass even if function throws undefined", function() {
      assertPass(function() {
        !function() { throw undefined }.must.throw() 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw() })
    })
  })

  describe("given String", function() {
    it("must pass if function throws with identical message", function() {
      assertPass(function() {
        !function() { throw new Error("Oh no!") }.must.throw("Oh no!") 
      })
    })

    it("must fail if function throws with part of identical message",
      function() {
      assertFail(function() {
        !function() { throw new Error("Oh no!") }.must.throw("Oh no") 
      })
    })

    it("must fail if function throws with unequivalent message", function() {
      assertFail(function() {
        !function() { throw new Error("Oh yes!") }.must.throw("Oh no!") 
      })
    })

    it("must pass if function throws an identical string", function() {
      assertPass(function() {
        !function() { throw "Oh no!" }.must.throw("Oh no!") 
      })
    })

    it("must fail if function throws with part of identical string",
      function() {
      assertFail(function() {
        !function() { throw "Oh no!" }.must.throw("Oh no") 
      })
    })

    it("must fail if function throws an equivalent string", function() {
      assertFail(function() { !function() { throw 42 }.must.throw("42") })
    })

    it("must fail if function throws an unequivalent string", function() {
      assertFail(function() {
        !function() { throw "Oh yes!" }.must.throw("Oh no!") 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw("Oh no!") })
    })
  })

  describe("given RegExp", function() {
    it("must pass if function throws with matching message", function() {
      assertPass(function() {
        !function() { throw new Error("Oh no!") }.must.throw(/no!/) 
      })
    })

    it("must fail if function throws with unmatching message", function() {
      assertFail(function() {
        !function() { throw new Error("Oh yes!") }.must.throw(/no!/) 
      })
    })

    it("must pass if function throws an matching string", function() {
      assertPass(function() {
        !function() { throw "Oh no!" }.must.throw(/no!/) 
      })
    })

    it("must fail if function throws an unmatching string", function() {
      assertFail(function() {
        !function() { throw "Oh yes!" }.must.throw(/no!/) 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw(/no!/) })
    })
  })

  describe("given Function", function() {
    function MyError() {}

    it("must pass if function throws instance of function", function() {
      assertPass(function() {
        !function() { throw new MyError }.must.throw(MyError) 
      })
    })

    it("must fail if function throws instance of other function", function() {
      assertFail(function() {
        !function() { throw new Error }.must.throw(MyError) 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw(MyError) })
    })
  })

  describe("given null", function() {
    it("must pass if function throws null", function() {
      assertPass(function() {
        !function() { throw null }.must.throw(null) 
      })
    })

    it("must fail if function throws undefined", function() {
      assertFail(function() {
        !function() { throw undefined }.must.throw(null) 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw(null) })
    })
  })

  describe("given undefined", function() {
    it("must pass if function throws undefined", function() {
      assertPass(function() {
        !function() { throw undefined }.must.throw(undefined) 
      })
    })

    it("must fail if function throws null", function() {
      assertFail(function() {
        !function() { throw null }.must.throw(undefined) 
      })
    })

    it("must fail if function does not throw", function() {
      assertFail(function() { !function() {}.must.throw(undefined) })
    })
  })

  it("must invoke function in global context", function() {
    var context
    function fn() { context = this }
    fn.must.not.throw()
    assert.strictEqual(context, global)
  })

  it("must be bound", function() {
    assertPass(function() {
      !function() { throw 42 }.must.throw.call() 
    })
  })

  var noThrower = function() { 42 }
  mustThrowAssertionError(function() { noThrower.must.throw() }, {
    actual: noThrower,
    message: "function () { 42 } must throw"
  })

  describe(".not", function() {
    function thrower() { throw 42 }
    function not() { thrower.must.not.throw() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: thrower,
      message: "function thrower() { throw 42 } must not throw"
    })
  })

  describe("given anything", function() {
    var thrower = function() { throw "Nope!" }
    mustThrowAssertionError(function() { thrower.must.throw("Oh no!") }, {
      actual: thrower,
      expected: "Oh no!",
      message: "function () { throw \"Nope!\" } must throw \"Oh no!\""
    })
  })
})

describe("Must.prototype.length", function() {
  describe("given String", function() {
    it("must pass if length equal", function() {
      assertPass(function() { "hello".must.have.length(5) })
    })

    it("must fail if length not equal", function() {
      assertFail(function() { "hello".must.have.length(42) })
    })
  })

  describe("given Array", function() {
    it("must pass if length equal", function() {
      assertPass(function() { [1, 2, 3, 4].must.have.length(4) })
    })

    it("must fail if length not equal", function() {
      assertFail(function() { [1, 2, 3, 4].must.have.length(42) })
    })
  })

  it("must be bound", function() {
    assertPass(function() { "hello".must.have.length.call(null, 5) })
  })

  mustThrowAssertionError(function() { "hello".must.have.length(42) }, {
    actual: "hello",
    expected: 42,
    message: "\"hello\" must have length of 42"
  })

  describe(".not", function() {
    function not() { "hello".must.not.have.length(5) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: "hello",
      expected: 5,
      message: "\"hello\" must not have length of 5"
    })
  })
})

function mustPassProperty(name, inheritable) {
  var pass = inheritable ? "pass" : "fail"
  var fail = inheritable ? "fail" : "pass"
  var throws = inheritable ? assertFail : assertPass
  var doesNotThrow = inheritable ? assertPass : assertFail
  var errName = name.replace(/[A-Z]/, function(l) {return " "+l.toLowerCase()})

  describe("given name", function() {
    it("must pass if object has property", function() {
      assertPass(function() { ({love: 69}).must.have[name]("love") })
    })

    it("must "+pass+" if object has inherited property", function() {
      var obj = Object.create({love: 69})
      doesNotThrow(function() { obj.must.have[name]("love") })
    })

    it("must fail if object doesn't have property", function() {
      assertFail(function() { ({}).must.have[name]("love") })
    })

    it("must pass if object has property as undefined", function() {
      assertPass(function() {
        ({love: undefined}).must.have[name]("love") 
      })
    })

    it("must "+pass+" if object has inherited property as undefined",
      function() {
      var obj = Object.create({love: undefined})
      doesNotThrow(function() { obj.must.have[name]("love") })
    })

    mustThrowAssertionError(function() { Must({}).have[name]("love") }, {
      actual: {},
      message: "{} must have "+errName+" \"love\""
    })

    describe(".not", function() {
      function not() { ({love: 69}).must.not.have[name]("love") }

      it("must invert the assertion", function() {
        assertFail(not)
      })

      mustThrowAssertionError(not, {
        actual: {love: 69},
        message: "{\"love\":69} must not have "+errName+" \"love\""
      })
    })
  })

  describe("given name and value", function() {
    it("must pass if object has property with identical value", function() {
      assertPass(function() {
        ({love: 69}).must.have[name]("love", 69) 
      })
    })

    it("must "+pass+" if object has inherited property with identical value",
      function() {
      var obj = Object.create({love: 69})
      doesNotThrow(function() { obj.must.have[name]("love", 69) })
    })

    it("must fail if object doesn't have property", function() {
      assertFail(function() { ({}).must.have[name]("love", 69) })
    })

    it("must fail if object has property with equivalent value", function() {
      assertFail(function() {
        ({love: 69}).must.have[name]("love", new Number(69)) 
      })
    })

    it("must pass if object has property asserted undefined", function() {
      assertPass(function() {
        ({love: undefined}).must.have[name]("love", undefined) 
      })
    })

    it("must "+pass+" if object has inherited property asserted undefined",
      function() {
      var obj = Object.create({love: undefined})
      doesNotThrow(function() { obj.must.have[name]("love", undefined) })
    })

    mustThrowAssertionError(function() { Must({}).have[name]("love", 69) }, {
      actual: {},
      message: "{} must have "+errName+" \"love\" equal to 69"
    })

    describe(".not", function() {
      function not() { ({love: 69}).must.not.have[name]("love", 69) }

      it("must invert the assertion", function() {
        assertFail(not)
      })

      mustThrowAssertionError(not, {
        actual: {love: 69},
        message: "{\"love\":69} must not have "+errName+" \"love\" equal to 69"
      })
    })
  })

  it("must fail gracefully if null", function() {
    function test() { Must(null).have[name]("love") }
    assertFail(test, Must.AssertionError)
  })

  it("must fail gracefully if undefined", function() {
    function test() { Must(undefined).have[name]("love") }
    assertFail(test, Must.AssertionError)
  })

  it("must be bound", function() {
    assertPass(function() {
      ({love: 69}).must.have[name].call(null, "love") 
    })
  })
}

describe("Must.prototype.property", function() {
  mustPassProperty("property", true)
})

describe(".prototype.ownProperty", function() {
  mustPassProperty("ownProperty", false)

  it("must pass if object has property named hasOwnProperty", function() {
    assertPass(function() {
      ({hasOwnProperty: false}).must.have.ownProperty("hasOwnProperty") 
    })
  })
})

describe("Must.prototype.own", function() {
  it("must be an alias of Must.prototype.ownProperty", function() {
    assert.strictEqual(Must.prototype.own, Must.prototype.ownProperty)
  })
})

function mustPassEnumerable(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assertFail : assertPass
  var doesNotThrow = truthy ? assertPass : assertFail

  it("must "+pass+" if property is enumerable", function() {
    var obj = {love: true}
    doesNotThrow(function() { obj.must.have[name]("love") })
  })

  it("must "+pass+" if inherited property is enumerable", function() {
    function EnumerateThis() {}
    EnumerateThis.prototype.love = 69
    doesNotThrow(function() { new EnumerateThis().must.have[name]("love") })
  })
  
  it("must "+fail+" if property is nonenumerable", function() {
    var obj = Object.create(Object.prototype, {
      love: {value: 69, enumerable: false},
    })
    throws(function() { obj.must.have[name]("love") })
  })
  
  it("must "+fail+" if inherited property is nonenumerable", function() {
    function EnumerateThis() {}
    EnumerateThis.prototype = Object.create(Object.prototype, {
      love: {value: 69, enumerable: false},
    })
    throws(function() { new EnumerateThis().must.have[name]("love") })
  })

  it("must fail if property does not exist", function() {
    assertFail(function() { ({}).must.have[name]("love") })
  })

  it("must pass if object has "+name+" property named \"propertyIsEnumerable\"",
    function() {
    var obj = Object.create(Object.prototype, {
      propertyIsEnumerable: {value: false, enumerable: truthy}
    })
    assertPass(function() {
      obj.must.have[name]("propertyIsEnumerable") 
    })
  })

  it("must fail gracefully if null", function() {
    function test() { Must(null).have[name]("love") }
    assertFail(test, Must.AssertionError)
  })

  it("must fail gracefully if undefined", function() {
    function test() { Must(undefined).have[name]("love") }
    assertFail(test, Must.AssertionError)
  })

  it("must be bound", function() {
    var obj = Object.create(Object.prototype, {
      love: {value: false, enumerable: truthy}
    })
    assertPass(function() { obj.must.have[name].call(null, "love") })
  })

  var errObj = Object.create(Object.prototype, {
    life: {value: 42, enumerable: true},
    love: {value: 69, enumerable: false},
  })
  var errProp = truthy ? "love" : "life"

  mustThrowAssertionError(function() { errObj.must.have[name](errProp) }, {
    actual: {life: 42},
    message: "{\"life\":42} must have "+name+" property \""+errProp+"\""
  })

  describe(".not", function() {
    var errProp = truthy ? "life" : "love"
    function not() { errObj.must.not.have[name](errProp) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: {life: 42},
      message: "{\"life\":42} must not have "+name+" property \""+errProp+"\""
    })
  })
}

describe(".prototype.enumerable", function() {
  mustPassEnumerable("enumerable", true)
})

describe("Must.prototype.enumerableProperty", function() {
  it("must be an alias of Must.prototype.enumerable", function() {
    var enumerable = Must.prototype.enumerable
    assert.strictEqual(Must.prototype.enumerableProperty, enumerable)
  })
})

describe(".prototype.nonenumerable", function() {
  mustPassEnumerable("nonenumerable", false)
})

describe("Must.prototype.nonenumerableProperty", function() {
  it("must be an alias of Must.prototype.nonenumerable", function() {
    var nonenumerable = Must.prototype.nonenumerable
    assert.strictEqual(Must.prototype.nonenumerableProperty, nonenumerable)
  })
})

describe(".prototype.frozen", function() {
  it("must pass if object is frozen", function() {
    assertPass(function() { Object.freeze({}).must.be.frozen() })
  })

  it("must fail if object is thawed", function() {
    assertFail(function() { ({}).must.be.frozen() })
  })

  it("must be bound", function() {
    var frozen = Object.freeze({})
    assertPass(function() { frozen.must.be.frozen.call() })
  })

  mustThrowAssertionError(function() { ({}).must.be.frozen() }, {
    actual: {},
    message: "{} must be frozen"
  })

  describe(".not", function() {
    function not() { Object.freeze({}).must.not.be.frozen() }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: {},
      message: "{} must not be frozen"
    })
  })
})

describe(".prototype.below", function() {
  it("must pass if below", function() {
    assertPass(function() { (42).must.be.below(69) })
  })

  it("must fail if equal", function() {
    assertFail(function() { (69).must.be.below(69) })
  })

  it("must fail if above", function() {
    assertFail(function() { (1337).must.be.below(69) })
  })

  it("must be bound", function() {
    assertPass(function() { (42).must.be.below.call(null, 69) })
  })

  mustThrowAssertionError(function() { (69).must.be.below(42) }, {
    actual: 69,
    expected: 42,
    message: "69 must be below 42"
  })

  describe(".not", function() {
    function not() { (42).must.not.be.below(69) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: 42,
      expected: 69,
      message: "42 must not be below 69"
    })
  })
})

describe("Must.prototype.lt", function() {
  it("must be an alias of Must.prototype.below", function() {
    assert.strictEqual(Must.prototype.lt, Must.prototype.below)
  })
})

describe(".prototype.most", function() {
  it("must pass if below", function() {
    assertPass(function() { (42).must.be.at.most(69) })
  })

  it("must pass if equal", function() {
    assertPass(function() { (69).must.be.at.most(69) })
  })

  it("must fail if above", function() {
    assertFail(function() { (1337).must.be.at.most(69) })
  })

  it("must be bound", function() {
    assertPass(function() { (42).must.be.at.most.call(null, 69) })
  })

  mustThrowAssertionError(function() { (69).must.be.at.most(42) }, {
    actual: 69,
    expected: 42,
    message: "69 must be at most 42"
  })

  describe(".not", function() {
    function not() { (42).must.not.be.at.most(69) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: 42,
      expected: 69,
      message: "42 must not be at most 69"
    })
  })
})

describe("Must.prototype.lte", function() {
  it("must be an alias of Must.prototype.most", function() {
    assert.strictEqual(Must.prototype.lte, Must.prototype.most)
  })
})

describe(".prototype.above", function() {
  it("must pass if above", function() {
    assertPass(function() { (69).must.be.above(42) })
  })

  it("must fail if equal", function() {
    assertFail(function() { (69).must.be.above(69) })
  })

  it("must fail if below", function() {
    assertFail(function() { (69).must.be.above(1337) })
  })

  it("must be bound", function() {
    assertPass(function() { (69).must.be.above.call(null, 42) })
  })

  mustThrowAssertionError(function() { (42).must.be.above(69) }, {
    actual: 42,
    expected: 69,
    message: "42 must be above 69"
  })

  describe(".not", function() {
    function not() { (69).must.not.be.above(42) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: 69,
      expected: 42,
      message: "69 must not be above 42"
    })
  })
})

describe("Must.prototype.gt", function() {
  it("must be an alias of Must.prototype.above", function() {
    assert.strictEqual(Must.prototype.gt, Must.prototype.above)
  })
})

describe(".prototype.least", function() {
  it("must pass if above", function() {
    assertPass(function() { (69).must.be.at.least(42) })
  })

  it("must pass if equal", function() {
    assertPass(function() { (69).must.be.at.least(69) })
  })

  it("must fail if below", function() {
    assertFail(function() { (69).must.be.at.least(1337) })
  })

  it("must be bound", function() {
    assertPass(function() { (69).must.be.at.least.call(null, 42) })
  })

  mustThrowAssertionError(function() { (42).must.be.at.least(69) }, {
    actual: 42,
    expected: 69,
    message: "42 must be at least 69"
  })

  describe(".not", function() {
    function not() { (69).must.not.be.at.least(42) }

    it("must invert the assertion", function() {
      assertFail(not)
    })

    mustThrowAssertionError(not, {
      actual: 69,
      expected: 42,
      message: "69 must not be at least 42"
    })
  })
})

describe("Must.prototype.gte", function() {
  it("must be an alias of Must.prototype.least", function() {
    assert.strictEqual(Must.prototype.gte, Must.prototype.least)
  })
})
