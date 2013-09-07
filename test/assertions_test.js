var assert = require("assert")
var Must = require("..")

function mustThrowAssertionError(test, props) {
  describe("AssertionError", function() {
    it("must be thrown", function() {
      assert.throws(test, Must.AssertionError)
    })

    it("must have properties", function() {
      try { test() }
      catch (ex) {
        assert.deepEqual(ex, props)
      }
    })

    it("must have stack trace", function() {
      try { test() }
      catch (ex) {
        var stack = ex.stack.split("\n")
        assert(stack[0].match(/AssertionError/, "must include AssertionError"))
        assert(stack[1].match(/\/test\//), "must have test at top")
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
    assert.doesNotThrow(function() { [].must.be[name].instanceof(Array) })
  })

  it("must be like Must.prototype.instanceof", function() {
    assert.doesNotThrow(function() { [].must.be[name](Array) })
    assert.throws(function() { /a/.must.be[name](Array) })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { [].must.be[name].call(null, Array) })
  })

  mustThrowAssertionError(function() { "".must.be[name](Array) }, {
    actual: "",
    expected: Array,
    message: "\"\" must be an instance of Array"
  })

  describe(".not", function() {
    function not() { [].must.not.be[name](Array) }

    it("must invert the assertion", function() {
      assert.throws(not)
    })

    it("must carry over the current state", function() {
      assert.throws(function() { true.must.not.be[name].ok() })
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

describe("Must.prototype.be", function() {
  it("must return an instance of Must", function() {
    assert(true.must.be instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.doesNotThrow(function() { true.must.be.true() })
  })

  it("must be like Must.prototype.equal", function() {
    assert.doesNotThrow(function() { false.must.be(false) })
    assert.throws(function() { true.must.be(false) })

    assert.doesNotThrow(function() { (42).must.be(42) })
    assert.throws(function() { (42).must.be(1337) })

    assert.doesNotThrow(function() { var obj = {}; obj.must.be(obj) })
    assert.throws(function() { ({}).must.be({}) })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { (42).must.be.call(null, 42) })
  })

  mustThrowAssertionError(function() { true.must.be(42) }, {
    actual: true,
    expected: 42,
    message: "true must equal 42"
  })

  describe(".not", function() {
    function not() { true.must.not.be(true) }

    it("must invert the assertion", function() {
      assert.throws(not)
    })

    it("must carry over the current state", function() {
      assert.throws(function() { true.must.not.be.true() })
    })

    mustThrowAssertionError(not, {
      actual: true,
      expected: true,
      message: "true must not equal true"
    })
  })
})

describe("Must.prototype.have", function() {
  it("must return an instance of Must", function() {
    assert(true.must.have instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.doesNotThrow(function() { true.must.have.true() })
  })
})

describe("Must.prototype.not", function() {
  it("must return an instance of Must", function() {
    assert(true.must.not instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.doesNotThrow(function() { false.must.not.equal(true) })
  })

  it("must invert condition each time", function() {
    assert.doesNotThrow(function() { true.must.not.not.equal(true) })
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
    assert.doesNotThrow(function() { true.must.to.true() })
  })
})

function mustPassTrue(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.throws : assert.doesNotThrow
  var doesNotThrow = truthy ? assert.doesNotThrow : assert.throws
  
  it("must "+pass+" given true literal", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must fail given true object", function() {
    assert.throws(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false literal", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must fail given false object", function() {
    assert.throws(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must fail given zero number literal", function() {
    assert.throws(function() { Must(0).be[name]() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(!truthy).be[name] })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { Must(truthy).be[name].call(null) })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    expected: truthy,
    message: !truthy + " must be " + truthy
  })

  describe(".not", function() {
    function not() { truthy.must.not.be[name]() }

    it("must invert the assertion", function() {
      assert.throws(not)
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
    assert.doesNotThrow(function() { Must(null).be.null() })
  })

  it("must fail given true literal", function() {
    assert.throws(function() { Must(true).be.null() })
  })

  it("must fail given false literal", function() {
    assert.throws(function() { Must(false).be.null() })
  })

  it("must fail given undefined", function() {
    assert.throws(function() { Must(undefined).be.null() })
  })

  it("must fail given empty string", function() {
    assert.throws(function() { Must("").be.null() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(null).be.null })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { Must(null).be.null.call(null) })
  })

  mustThrowAssertionError(function() { true.must.be.null() }, {
    actual: true,
    expected: null,
    message: "true must be null"
  })

  describe(".not", function() {
    function not() { Must(null).not.be.null() }

    it("must invert the assertion", function() {
      assert.throws(not)
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
    assert.doesNotThrow(function() { Must(undefined).be.undefined() })
  })

  it("must fail given true literal", function() {
    assert.throws(function() { Must(true).be.undefined() })
  })

  it("must fail given false literal", function() {
    assert.throws(function() { Must(false).be.undefined() })
  })

  it("must fail given null", function() {
    assert.throws(function() { Must(null).be.undefined() })
  })

  it("must fail given empty string", function() {
    assert.throws(function() { Must("").be.undefined() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(undefined).be.undefined })
  })

  it("must be bound", function() {
    // When unbound, the value of actual is most likely to be undefined, so
    // test with a "not" in this case too.
    assert.doesNotThrow(function() { Must(undefined).be.undefined.call(null) })
    assert.throws(function() { Must(null).be.undefined.call(null) })
  })

  mustThrowAssertionError(function() { true.must.be.undefined() }, {
    actual: true,
    expected: undefined,
    message: "true must be undefined"
  })

  describe(".not", function() {
    function not() { Must(undefined).not.be.undefined() }

    it("must invert the assertion", function() {
      assert.throws(not)
    })

    mustThrowAssertionError(not, {
      actual: undefined,
      expected: undefined,
      message: "undefined must not be undefined"
    })
  })
})

function mustBeType(name, msg, values, inspect) {
  var valid

  for (var type in values) !function(value) {
    if (valid == null) valid = value

    it("must pass given "+name+" "+type, function() {
      assert.doesNotThrow(function() { Must(value).be[name]() })
    })
  }(values[type])

  it("must fail given null", function() {
    assert.throws(function() { Must(null).be[name]() })
  })

  it("must fail given undefined", function() {
    assert.throws(function() { Must(undefined).be[name]() })
  })

  if (name != "boolean") it("must fail given true literal", function() {
    assert.throws(function() { Must(true).be[name]() })
  })

  if (name != "boolean") it("must fail given false literal", function() {
    assert.throws(function() { Must(false).be[name]() })
  })

  if (name != "number") it("must fail given number literal", function() {
    assert.throws(function() { Must(0).be[name]() })
  })

  if (name != "string") it("must fail given string literal", function() {
    assert.throws(function() { Must("").be[name]() })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { Must(valid).be[name].call(null) })
  })

  mustThrowAssertionError(function() { Must(null).be[name]() }, {
    actual: null,
    message: "null must " + msg
  })

  describe(".not", function() {
    function not() { Must(valid).not.be[name]() }

    it("must invert the assertion", function() {
      assert.throws(not)
    })

    mustThrowAssertionError(not, {
      actual: valid,
      message: inspect + " must not " + msg
    })
  })
}

describe("Must.prototype.boolean", function() {
  mustBeType("boolean", "be a boolean", {
    "true literal": true,
    "false literal": false,
    "true object": new Boolean(true),
    "false object": new Boolean(false)
  }, "true")
})

describe("Must.prototype.number", function() {
  var dump = "0"
  mustBeType("number", "be a number", {literal: 0, object: new Number}, dump)
})

describe("Must.prototype.string", function() {
  var dump = "\"\""
  mustBeType("string", "be a string", {literal: "", object: new String}, dump)
})

describe("Must.prototype.regexp", function() {
  var dump = "/(?:)/"
  mustBeType("regexp", "be a regular expression", {object: new RegExp}, dump)
})

describe("Must.prototype.date", function() {
  var dump = "1970-01-01T00:00:00.000Z"
  mustBeType("date", "be a date", {object: new Date(0)}, dump)
})

describe("Must.prototype.array", function() {
  var dump = "[]"
  mustBeType("array", "be an array", {literal: [], object: new Array}, dump)
})

describe("Must.prototype.function", function() {
  var dump = "function () {}"
  mustBeType("function", "be a function", {object: function() {}}, dump)
})

describe("Must.prototype.object", function() {
  var dump = "{}"
  mustBeType("object", "be an object", {object: new Object}, dump)
})

function mustPassTruthy(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.throws : assert.doesNotThrow
  var doesNotThrow = truthy ? assert.doesNotThrow : assert.throws

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
    it("must "+pass+" given empty literal", function() {
      doesNotThrow(function() { Must([]).be[name]() })
    })

    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must(new Array).be[name]() })
    })
  })

  describe("given Function", function() {
    it("must "+pass+" given function", function() {
      doesNotThrow(function() { Must(new Function).be[name]() })
    })
  })

  describe("given Object", function() {
    it("must "+pass+" given empty literal", function() {
      doesNotThrow(function() { Must({}).be[name]() })
    })

    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must(new Object).be[name]() })
    })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(!truthy).be[name] })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { Must(truthy).be[name].call(null) })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    message: !truthy + " must be " + name
  })

  describe(".not", function() {
    function not() { truthy.must.not.be[name]() }

    it("must invert the assertion", function() {
      assert.throws(not)
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

describe("Must.prototype.ok", function() {
  it("must be an alias of Must.prototype.truthy", function() {
    var a = Object.getOwnPropertyDescriptor(Must.prototype, "ok")
    var b = Object.getOwnPropertyDescriptor(Must.prototype, "truthy")
    assert.deepEqual(a, b)
  })
})

describe("Must.prototype.falsy", function() {
  mustPassTruthy("falsy", false)
})

describe("Must.prototype.instanceof", function() {
  describe("given Boolean", function() {
    it("must fail given boolean literal", function() {
      assert.throws(function() { true.must.be.instanceof(Boolean) })
      assert.throws(function() { false.must.be.instanceof(Boolean) })
    })

    it("must pass given boolean object", function() {
      assert.doesNotThrow(function() {
        Must(new Boolean()).be.instanceof(Boolean)
      })
    })

    it("must fail given Boolean constructor", function() {
      assert.throws(function() { Boolean.must.be.instanceof(Boolean) })
    })
  })

  describe("given Number", function() {
    it("must fail given number literal", function() {
      assert.throws(function() { Must(42).be.instanceof(Number) })
    })

    it("must pass given number object", function() {
      assert.doesNotThrow(function() {
        Must(new Number()).be.instanceof(Number)
      })
    })

    it("must fail given Number constructor", function() {
      assert.throws(function() { Number.must.be.instanceof(Number) })
    })
  })

  describe("given String", function() {
    it("must fail given string literal", function() {
      assert.throws(function() { Must("").be.instanceof(String) })
    })

    it("must pass given string object", function() {
      assert.doesNotThrow(function() {
        Must(new String()).be.instanceof(String)
      })
    })

    it("must fail given String constructor", function() {
      assert.throws(function() { String.must.be.instanceof(String) })
    })
  })

  describe("given Array", function() {
    it("must pass given array literal", function() {
      assert.doesNotThrow(function() { [].must.be.instanceof(Array) })
    })

    it("must fail given Array constructor", function() {
      assert.throws(function() { Array.must.be.instanceof(Array) })
    })
  })

  describe("given Function", function() {
    it("must pass given function object", function() {
      assert.doesNotThrow(function() {
        Must(new Function).be.instanceof(Function) 
      })
    })

    it("must pass given Function constructor", function() {
      assert.doesNotThrow(function() { Function.must.be.instanceof(Function) })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() {}

    it("must pass given an instance of it", function() {
      assert.doesNotThrow(function() { new Foo().must.be.instanceof(Foo) })
    })

    it("must pass given an instance of it and Object", function() {
      assert.doesNotThrow(function() { new Foo().must.be.instanceof(Object) })
    })

    it("must fail given an instance of another", function() {
      assert.throws(function() { new Bar().must.be.instanceof(Foo) })
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { [].must.be.instanceof.call(null, Array) })
  })

  mustThrowAssertionError(function() { [].must.be.instanceof(String) }, {
    actual: [],
    expected: String,
    message: "[] must be an instance of String"
  })

  describe(".not", function() {
    function not() { [].must.not.be.instanceof(Array) }

    it("must invert the assertion", function() {
      assert.throws(not)
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
    var a = Object.getOwnPropertyDescriptor(Must.prototype, "instanceOf")
    var b = Object.getOwnPropertyDescriptor(Must.prototype, "instanceof")
    assert.deepEqual(a, b)
  })
})

describe("Must.prototype.equal", function() {
  it("must pass given nulls", function() {
    assert.doesNotThrow(function() { Must(null).be.equal(null) })
  })

  it("must pass given undefineds", function() {
    assert.doesNotThrow(function() { Must(undefined).be.equal(undefined) })
  })

  it("must fail given null and undefined", function() {
    assert.throws(function() { Must(null).be.equal(undefined) })
  })

  it("must fail given undefined and null", function() {
    assert.throws(function() { Must(undefined).be.equal(null) })
  })

  describe("given Boolean", function() {
    function mustPassTrueEqual(bool) {
      it("must pass given "+bool+" literals", function() {
        assert.doesNotThrow(function() { Must(bool).be.equal(bool) })
      })

      it("must fail given "+bool+" literal and object", function() {
        assert.throws(function() { Must(bool).be.equal(new Boolean(bool)) })
        assert.throws(function() { Must(new Boolean(bool)).be.equal(bool) })
      })

      it("must fail given "+bool+" literal with "+!bool, function() {
        assert.throws(function() { Must(bool).be.equal(!bool) })
      })
    }

    mustPassTrueEqual(true)
    mustPassTrueEqual(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must(42).be.equal(42) })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must(42).be.equal(1337) })
    })

    it("must fail given equivalent literal and object", function() {
      assert.throws(function() { Must(42).be.equal(new Number(42)) })
      assert.throws(function() { Must(new Number(42)).be.equal(42) })
    })

    it("must fail given string", function() {
      assert.throws(function() { Must(42).be.equal("42") })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must("ok").be.equal("ok") })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must("ok").be.equal("nok") })
    })

    it("must fail given equivalent literal and object", function() {
      assert.throws(function() { Must("ok").be.equal(new String("ok")) })
      assert.throws(function() { Must(new String("ok")).be.equal("ok") })
    })

    it("must fail given number", function() {
      assert.throws(function() { Must("42").be.equal(42) })
    })
  })

  describe("given RegExp", function() {
    it("must fail given equivalent literals", function() {
      assert.throws(function() { Must(/a/).be.equal(/a/) })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must(/a/).be.equal(/b/) })
    })

    it("must pass given identical objects", function() {
      var regexp = new RegExp
      assert.doesNotThrow(function() { Must(regexp).be.equal(regexp) })
    })

    it("must fail given equivalent objects", function() {
      assert.throws(function() { Must(new RegExp).be.equal(new RegExp) })
    })
  })

  describe("given Date", function() {
    it("must pass given identical objects", function() {
      var now = new Date
      assert.doesNotThrow(function() { Must(now).be.equal(now) })
    })

    it("must fail given equivalent objects", function() {
      assert.throws(function() { Must(new Date(42)).be.equal(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must fail given equivalent literals", function() {
      assert.throws(function() { Must([1]).be.equal([1]) })
    })

    it("must pass given identical objects", function() {
      var array = new Array
      assert.doesNotThrow(function() { Must(array).be.equal(array) })
    })

    it("must fail given unidentical objects", function() {
      assert.throws(function() { Must(new Array).be.equal(new Array) })
    })
  })

  describe("given Function", function() {
    it("must pass given identical objects", function() {
      var fn = new Function
      assert.doesNotThrow(function() { Must(fn).be.equal(fn) })
    })

    it("must fail given equivalent objects", function() {
      assert.throws(function() {
        Must(new Function("foo")).be.equal(new Function("foo")) 
      })
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { true.must.equal.call(null, true) })
  })

  mustThrowAssertionError(function() { "secret".must.equal(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must equal 42"
  })

  describe(".not", function() {
    function not() { "secret".must.not.equal("secret") }

    it("must invert the assertion", function() {
      assert.throws(not)
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
    assert.doesNotThrow(function() { Must(null).be.eql(null) })
  })

  it("must pass given undefineds", function() {
    assert.doesNotThrow(function() { Must(undefined).be.eql(undefined) })
  })

  it("must fail given null and undefined", function() {
    assert.throws(function() { Must(null).be.eql(undefined) })
    assert.throws(function() { Must(undefined).be.eql(null) })
  })

  it("must fail given an empty array and empty object", function() {
    // Can't think of an assertion library that would be nuts enough to consider
    // {} equivalent to []. Oh yeah, I can! For fucks sake, this is reason #42
    // why Must.js is better!
    assert.throws(function() { Must({}).be.eql([]) })
  })

  describe("given Boolean", function() {
    function mustPassTrueEql(bool) {
      it("must pass given "+bool+" literals", function() {
        assert.doesNotThrow(function() { Must(bool).be.eql(bool) })
      })

      it("must pass given "+bool+" literal and object", function() {
        assert.doesNotThrow(function() { Must(bool).be.eql(new Boolean(bool)) })
        assert.doesNotThrow(function() { Must(new Boolean(bool)).be.eql(bool) })
      })

      it("must fail given "+bool+" literal with "+!bool, function() {
        assert.throws(function() { Must(bool).be.eql(!bool) })
      })
    }

    mustPassTrueEql(true)
    mustPassTrueEql(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must(42).be.eql(42) })
    })

    it("must pass given equivalent literal and object", function() {
      assert.doesNotThrow(function() { Must(42).be.eql(new Number(42)) })
      assert.doesNotThrow(function() { Must(new Number(42)).be.eql(42) })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must(42).be.eql(1337) })
    })

    it("must fail given string", function() {
      assert.throws(function() { Must(42).eql("42") })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must("ok").be.eql("ok") })
    })

    it("must pass given equivalent literal and object", function() {
      assert.doesNotThrow(function() { Must("ok").be.eql(new String("ok")) })
      assert.doesNotThrow(function() { Must(new String("ok")).be.eql("ok") })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must("ok").be.eql("nok") })
    })

    it("must fail given equivalent number literal", function() {
      assert.throws(function() { Must("1").be.eql(1) })
    })

    it("must fail given equivalent number object", function() {
      assert.throws(function() { Must("1").be.eql(new Number(1)) })
    })

    it("must fail given number", function() {
      assert.throws(function() { Must("42").eql(42) })
    })
  })

  describe("given RegExp", function() {
    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must(/a/).be.eql(/a/) })
    })

    it("must fail given unequivalent literals", function() {
      assert.throws(function() { Must(/a/).be.eql(/b/) })
    })

    it("must pass given equivalent objects", function() {
      assert.doesNotThrow(function() { Must(new RegExp).be.eql(new RegExp) })
    })

    it("must fail given unequivalent objects", function() {
      assert.throws(function() {Must(new RegExp("a")).be.eql(new RegExp("b"))})
    })
  })

  describe("given Date", function() {
    it("must pass given identical objects", function() {
      var now = new Date
      assert.doesNotThrow(function() { Must(now).be.eql(now) })
    })

    it("must pass given equivalent objects", function() {
      assert.doesNotThrow(function() { Must(new Date(7)).be.eql(new Date(7)) })
    })

    it("must fail given unequivalent objects", function() {
      assert.throws(function() { Must(new Date(69)).be.eql(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must pass empty equivalent literals", function() {
      assert.doesNotThrow(function() { Must([]).be.eql([]) })
    })

    it("must pass given equivalent literals", function() {
      assert.doesNotThrow(function() { Must([1]).be.eql([1]) })
    })

    it("must pass given identical objects", function() {
      var array = new Array
      assert.doesNotThrow(function() { Must(array).be.eql(array) })
    })

    it("must fail given an empty and non-empty array", function() {
      assert.throws(function() { Must([]).be.eql([1]) })
      assert.throws(function() { Must([1]).be.eql([]) })
    })

    it("must fail given a smaller and a larger array", function() {
      assert.throws(function() { Must([1]).be.eql([1, 2]) })
      assert.throws(function() { Must([1, 2]).be.eql([1]) })
    })

    it("must pass given equivalent nested literals", function() {
      assert.doesNotThrow(function() { Must([1, [2], 3]).be.eql([1, [2], 3]) })
    })

    it("must fail given equivalent nested literals", function() {
      assert.throws(function() { Must([1, [2], 3]).be.eql([1, [42], 3]) })
    })
  })

  describe("given Function", function() {
    it("must pass given identical objects", function() {
      var fn = new Function
      assert.doesNotThrow(function() { Must(fn).be.eql(fn) })
    })

    it("must fail given equivalent objects", function() {
      assert.throws(function() {
        Must(new Function("foo")).be.eql(new Function("foo")) 
      })
    })
  })

  describe("given Object", function() {
    it("must pass given empty objects", function() {
      assert.doesNotThrow(function() { Must({}).be.eql({}) })
    })

    it("must fail given empty object and filled object", function() {
      assert.throws(function() { Must({}).be.eql({a: 42}) })
      assert.throws(function() { Must({a: 42}).be.eql({}) })
    })

    it("must fail given a smaller object and larger object", function() {
      assert.throws(function() { Must({a: 42, b: 69}).be.eql({a: 42}) })
      assert.throws(function() { Must({a: 42}).be.eql({a: 42, b: 69}) })
    })

    it("must pass given identical objects", function() {
      var obj = {a: 42, b: 69}
      assert.doesNotThrow(function() { Must(obj).be.eql(obj) })
    })

    it("must pass given equivalent objects", function() {
      var obj = {a: 42, b: 69}
      assert.doesNotThrow(function() { Must(obj).be.eql({a: 42, b: 69}) })
    })

    it("must fail given differently typed objects", function() {
      assert.throws(function() {Must({a: "42", b: 69}).be.eql({a: 42, b: 69})})
    })
  })

  describe("given instance", function() {
    it("must fail given equivalent instances", function() {
      function Priceless(value) { this.value }
      var a = new Priceless(42), b = new Priceless(42)
      assert.throws(function() { Must(a).eql(b) })
    })

    it("must fail given different instances", function() {
      assert.throws(function() { Must(new new Function).eql(new new Function) })
    })

    it("must pass given identical valueOf outputs", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable(42)
      assert.doesNotThrow(function() { Must(a).eql(b) })
    })

    it("must fail unequivalent valueOf outputs", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable(69)
      assert.throws(function() { Must(a).eql(b) })
    })

    it("must fail given differently typed valueOf outputs", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable("42")
      assert.throws(function() { Must(a).eql(b) })
    })

    it("must fail given identical valueOf outputs from different constructors",
      function() {
      function A(value) { this.value }
      A.prototype.valueOf = function() { return this.value }
      function B(value) { this.value }
      B.prototype.valueOf = function() { return this.value }
      assert.throws(function() { Must(new A(42)).eql(new B(42)) })
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { [].must.eql.call(null, []) })
  })

  mustThrowAssertionError(function() { "secret".must.eql(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must be equivalent to 42"
  })

  describe(".not", function() {
    function not() { "secret".must.not.eql("secret") }

    it("must invert the assertion", function() {
      assert.throws(not)
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
      assert.throws(function() { Must(true).be.empty() })
    })

    it("must fail given a false literal", function() {
      assert.throws(function() { Must(false).be.empty() })
    })

    it("must pass given a true object", function() {
      assert.doesNotThrow(function() { Must(new Boolean(true)).be.empty() })
    })

    it("must pass given a false object", function() {
      assert.doesNotThrow(function() { Must(new Boolean(false)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Boolean(false)
      obj.life = 42
      assert.throws(function() { Must(obj).be.empty() })
    })
  })

  describe("given Number", function() {
    it("must fail given an zero literal", function() {
      assert.throws(function() { Must(0).be.empty() })
    })

    it("must fail given a non-zero literal", function() {
      assert.throws(function() { Must(1).be.empty() })
    })

    it("must pass given a zero object", function() {
      assert.doesNotThrow(function() { Must(new Number).be.empty() })
    })

    it("must pass given a non-zero object", function() {
      assert.doesNotThrow(function() { Must(new Number(1)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Number(1)
      obj.life = 42
      assert.throws(function() { Must(obj).be.empty() })
    })
  })

  describe("given String", function() {
    it("must pass given an empty literal", function() {
      assert.doesNotThrow(function() { Must("").be.empty() })
    })

    it("must fail given a non-empty literal", function() {
      assert.throws(function() { Must("a").be.empty() })
    })

    it("must pass given an empty object", function() {
      assert.doesNotThrow(function() { Must(new String).be.empty() })
    })

    it("must fail given a non-empty object", function() {
      assert.throws(function() { Must(new String("a")).be.empty() })
    })
  })

  describe("given RegExp", function() {
    it("must pass given an empty object", function() {
      assert.doesNotThrow(function() { Must(new RegExp).be.empty() })
    })

    it("must pass given a non-empty object", function() {
      assert.doesNotThrow(function() { Must(new RegExp("a")).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new RegExp("a")
      obj.life = 42
      assert.throws(function() { Must(obj).be.empty() })
    })
  })

  describe("given Array", function() {
    it("must pass given an empty literal", function() {
      assert.doesNotThrow(function() { Must([]).be.empty() })
    })

    it("must fail given a non-empty literal", function() {
      assert.throws(function() { Must([1]).be.empty() })
    })
  })

  describe("given Function", function() {
    it("should pass given an empty object", function() {
      assert.doesNotThrow(function() { Must(new Function).be.empty() })
    })

    it("should pass given a non-empty object", function() {
      assert.doesNotThrow(function() { Must(new Function("a")).be.empty() })
    })

    it("should fail given a non-empty object with keys", function() {
      var obj = new Function("a")
      obj.life = 42
      assert.throws(function() { Must(obj).be.empty() })
    })
  })

  describe("given Object", function() {
    it("must pass given an empty literal", function() {
      assert.doesNotThrow(function() { Must({}).be.empty() })
    })

    it("must fail given a non-empty literal", function() {
      assert.throws(function() { Must({life: 42}).be.empty() })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() { this.life = 42 }

    it("must pass given an empty instance", function() {
      assert.doesNotThrow(function() { new Foo().must.be.empty() })
    })

    it("must fail given a non-empty instance", function() {
      assert.throws(function() { new Bar().must.be.empty() })
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { [].must.be.empty.call(null) })
  })

  mustThrowAssertionError(function() { [1].must.be.empty() }, {
    actual: [1],
    message: "[1] must be empty"
  })

  describe(".not", function() {
    function not() { [].must.not.be.empty() }

    it("must invert the assertion", function() {
      assert.throws(not)
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
      assert.doesNotThrow(function() { Must(literal).include("How") })
    })

    it("must fail if given string literal does not include string literal",
      function() {
      assert.throws(function() { Must(literal).include("good") })
    })

    it("must pass if given string literal includes string object", function() {
      assert.doesNotThrow(function() {
        Must(literal).include(new String("How")) 
      })
    })

    it("must fail if given string literal does not include string object",
      function() {
      assert.throws(function() { Must(literal).include(new String("good")) })
    })

    it("must pass if given string object includes string literal", function() {
      assert.doesNotThrow(function() { Must(object).include("How") })
    })

    it("must fail if given string object does not include string literal",
      function() {
      assert.throws(function() { Must(object).include("good") })
    })

    it("must pass if given string object includes string object", function() {
      assert.doesNotThrow(function() {Must(object).include(new String("How"))})
    })

    it("must fail if given string object does not include string object",
      function() {
      assert.throws(function() { Must(object).include(new String("good")) })
    })
  })

  describe("given Array", function() {
    it("must pass if given array includes number literal", function() {
      assert.doesNotThrow(function() { [1, 2, 3].must.include(2) })
    })

    it("must fail if given array does not include number literal", function() {
      assert.throws(function() { [1, 2, 3].must.include(42) })
    })

    it("must fail if given array includes equivalent number", function() {
      assert.throws(function() { [1, 2, 3].must.include(new Number(2)) })
    })
  })

  describe("given Object", function() {
    it("must pass if given object includes number literal", function() {
      assert.doesNotThrow(function() { ({a: 1, b: 2, c: 3}).must.include(2) })
    })

    it("must fail if given array does not include number literal", function() {
      assert.throws(function() { ({a: 1, b: 2, c: 3}).must.include(42) })
    })

    it("must fail if given array includes equivalent number", function() {
      var obj = ({a: 1, b: 2, c: 3})
      assert.throws(function() { obj.must.include(new Number(2)) })
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { [1, 2, 3].must.include.call(null, 2) })
  })

  mustThrowAssertionError(function() { [1, 2, 3].must.include(42) }, {
    actual: [1, 2, 3],
    expected: 42,
    message: "[1,2,3] must include 42"
  })

  describe(".not", function() {
    function not() { [1, 42, 3].must.not.include(42) }

    it("must invert the assertion", function() {
      assert.throws(not)
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
      assert.doesNotThrow(function() { Must(literal).match(/^Year \d+ might/) })
    })

    it("must fail if given string literal does not match", function() {
      assert.throws(function() { Must(literal).match(/^\d+ might/) })
    })

    it("must pass if given string object matches", function() {
      assert.doesNotThrow(function() { Must(object).match(/^Year \d+ might/) })
    })

    it("must fail if given string object does not match",
      function() {
      assert.throws(function() { Must(object).match(/^\d+ might/) })
    })
  })

  describe("given String and String", function() {
    var literal = "Year 2014 might be like 1984."
    var object = new String(literal)

    it("must pass if given string literal matches", function() {
      assert.doesNotThrow(function() {Must(literal).match("^Year \\d+ might")})
    })

    it("must fail if given string literal does not match", function() {
      assert.throws(function() { Must(literal).match("^\\d+ might") })
    })

    it("must pass if given string object matches", function() {
      assert.doesNotThrow(function() { Must(object).match("^Year \\d+ might") })
    })

    it("must fail if given string object does not match",
      function() {
      assert.throws(function() { Must(object).match("^\\d+ might") })
    })

    mustThrowAssertionError(function() { "1984".must.match("^2014$") }, {
      actual: "1984",
      expected: /^2014$/,
      message: "\"1984\" must match /^2014$/"
    })
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() { "abcd".must.match.call(null, /b/) })
  })

  mustThrowAssertionError(function() { "1984".must.match(/^2014$/) }, {
    actual: "1984",
    expected: /^2014$/,
    message: "\"1984\" must match /^2014$/"
  })

  describe(".not", function() {
    function not() { "1984".must.not.match(/^1984$/) }

    it("must invert the assertion", function() {
      assert.throws(not)
    })

    mustThrowAssertionError(not, {
      actual: "1984",
      expected: /^1984$/,
      message: "\"1984\" must not match /^1984$/"
    })
  })
})

describe("Must.prototype.throw", function() {
  it("must pass if function throws", function() {
    assert.doesNotThrow(function() { !function() { throw 5 }.must.throw() })
  })

  it("must pass even if function throws undefined", function() {
    assert.doesNotThrow(function() {
      !function() { throw undefined }.must.throw() 
    })
  })

  it("must fail if function does not throw", function() {
    assert.throws(function() { !function() {}.must.throw() })
  })

  it("must invoke function in global context", function() {
    var context
    function fn() { context = this }
    fn.must.not.throw()
    assert.strictEqual(context, global)
  })

  it("must be bound", function() {
    assert.doesNotThrow(function() {
      !function() { throw 42 }.must.throw.call(null) 
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
      assert.throws(not)
    })

    mustThrowAssertionError(not, {
      actual: thrower,
      message: "function thrower() { throw 42 } must not throw"
    })
  })
})
