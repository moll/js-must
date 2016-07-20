var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.undefined", function() {
  it("must pass given undefined", function() {
    assert.pass(function() { Must(undefined).be.undefined() })
  })

  it("must fail given true primitive", function() {
    assert.fail(function() { Must(true).be.undefined() })
  })

  it("must fail given false primitive", function() {
    assert.fail(function() { Must(false).be.undefined() })
  })

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.undefined() })
  })

  it("must fail given empty string", function() {
    assert.fail(function() { Must("").be.undefined() })
  })

  it("must not do anything when not called as a function", function() {
    assert.pass(function() { void Must(undefined).be.undefined })
  })

  require("./_assertion_error_test")(function() { Must(true).be.undefined() }, {
    actual: true,
    expected: undefined,
    message: "true must be undefined"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(undefined).not.be.undefined() })
    })
  })
})
