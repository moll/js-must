var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.instanceof", function() {
  // Allow using new Boolean:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  describe("given Boolean", function() {
    it("must fail given boolean primitive", function() {
      assert.fail(function() { Must(true).be.instanceof(Boolean) })
      assert.fail(function() { Must(false).be.instanceof(Boolean) })
    })

    it("must pass given boolean object", function() {
      assert.pass(function() {
        Must(new Boolean()).be.instanceof(Boolean)
      })
    })

    it("must fail given Boolean constructor", function() {
      assert.fail(function() { Must(Boolean).be.instanceof(Boolean) })
    })
  })

  describe("given Number", function() {
    it("must fail given number primitive", function() {
      assert.fail(function() { Must(42).be.instanceof(Number) })
    })

    it("must pass given number object", function() {
      assert.pass(function() {
        Must(new Number()).be.instanceof(Number)
      })
    })

    it("must fail given Number constructor", function() {
      assert.fail(function() { Must(Number).be.instanceof(Number) })
    })
  })

  describe("given String", function() {
    it("must fail given string primitive", function() {
      assert.fail(function() { Must("").be.instanceof(String) })
    })

    it("must pass given string object", function() {
      assert.pass(function() {
        Must(new String()).be.instanceof(String)
      })
    })

    it("must fail given String constructor", function() {
      assert.fail(function() { Must(String).be.instanceof(String) })
    })
  })

  describe("given Array", function() {
    it("must pass given array", function() {
      assert.pass(function() { Must([]).be.instanceof(Array) })
    })

    it("must fail given Array constructor", function() {
      assert.fail(function() { Must(Array).be.instanceof(Array) })
    })
  })

  describe("given Function", function() {
    it("must pass given function object", function() {
      assert.pass(function() {
        Must(function() {}).be.instanceof(Function)
      })
    })

    it("must pass given Function constructor", function() {
      assert.pass(function() { Must(Function).be.instanceof(Function) })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() {}

    it("must pass given an instance of it", function() {
      assert.pass(function() { Must(new Foo()).be.instanceof(Foo) })
    })

    it("must pass given an instance of it and Object", function() {
      assert.pass(function() { Must(new Foo()).be.instanceof(Object) })
    })

    it("must fail given an instance of another", function() {
      assert.fail(function() { Must(new Bar()).be.instanceof(Foo) })
    })
  })

  require("./_assertion_error_test")(function() {
    Must([]).be.instanceof(String)
  }, {
    actual: [],
    expected: String,
    message: "[] must be an instance of String"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([]).not.be.instanceof(Array) })
    })
  })
})
