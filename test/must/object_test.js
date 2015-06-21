var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.object", function() {
  it("must pass given object", function() {
    assert.pass(function() { Must({}).be.object() })
  })

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.object() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.object() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.object() })
    assert.fail(function() { Must(false).be.object() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.object() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.object() })
  })

  it("must pass given array", function() {
    assert.pass(function() { Must([]).be.object() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.object() }, {
    actual: 42,
    message: "42 must be an object"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must({}).not.be.object() })
    })
  })
})
