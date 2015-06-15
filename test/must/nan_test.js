var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.null", function() {
  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.nan() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.nan() })
  })

  it("must pass given NaN", function() {
    assert.pass(function() { Must(NaN).be.nan() })
  })

  it("must fail given another number", function() {
    assert.fail(function() { Must(42).be.nan() })
  })

  it("must fail given a string of NaN", function() {
    assert.fail(function() { Must("NaN").be.nan() })
  })

  it("must fail given a string of a number", function() {
    assert.fail(function() { Must("42").be.nan() })
  })

  describe("AssertionError", function() {
    function test() { Must(42).be.nan() }

    it("must be thrown", function() {
      assert.throws(test, Must.AssertionError)
    })

    // Can't test NaNs with strictEqual, sadly.
    it("must have all properties", function() {
      try { test() }
      catch (ex) {
        assert.strictEqual(ex.actual, 42)
        assert(isNaN(ex.expected))
        assert.strictEqual(ex.message, "42 must be NaN")
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

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(NaN).not.be.nan() })
    })
  })
})
