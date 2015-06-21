var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.array", function() {
  it("must pass given array", function() {
    assert.pass(function() { Must([]).be.array() })
  })

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.array() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.array() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.array() })
    assert.fail(function() { Must(false).be.array() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.array() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.array() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.array() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.array() }, {
    actual: 42,
    message: "42 must be an array"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([]).not.be.array() })
    })
  })
})
