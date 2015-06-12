var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.length", function() {
  describe("given String", function() {
    it("must pass if length equal", function() {
      assert.pass(function() { Must("hello").have.length(5) })
    })

    it("must fail if length not equal", function() {
      assert.fail(function() { Must("hello").have.length(42) })
    })
  })

  describe("given Array", function() {
    it("must pass if length equal", function() {
      assert.pass(function() { Must([1, 2, 3, 4]).have.length(4) })
    })

    it("must fail if length not equal", function() {
      assert.fail(function() { Must([1, 2, 3, 4]).have.length(42) })
    })
  })

  require("./_assertion_error_test")(function() { Must("hello").have.length(42) }, {
    actual: "hello",
    expected: 42,
    message: "\"hello\" must have length of 42"
  })

  describe(".not", function() {
    function not() { Must("hello").not.have.length(5) }

    it("must invert the assertion", function() {
      assert.fail(not)
    })

    require("./_assertion_error_test")(not, {
      actual: "hello",
      expected: 5,
      message: "\"hello\" must not have length of 5"
    })
  })
})
