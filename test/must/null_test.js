var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.null", function() {
  it("must pass given null", function() {
    assert.pass(function() { Must(null).be.null() })
  })

  it("must fail given true primitive", function() {
    assert.fail(function() { Must(true).be.null() })
  })

  it("must fail given false primitive", function() {
    assert.fail(function() { Must(false).be.null() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.null() })
  })

  it("must fail given empty string", function() {
    assert.fail(function() { Must("").be.null() })
  })

  it("must not do anything when not called as a function", function() {
    assert.pass(function() { void Must(null).be.null })
  })

  require("./_assertion_error_test")(function() { Must(true).be.null() }, {
    actual: true,
    expected: null,
    message: "true must be null"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(null).not.be.null() })
    })
  })
})
