var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.date", function() {
  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.date() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.date() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.date() })
    assert.fail(function() { Must(false).be.date() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.date() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.date() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.date() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.date() })
  })

  it("must pass given a date", function() {
    assert.pass(function() { Must(new Date).be.date() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.date() }, {
    actual: 42,
    message: "42 must be a date"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(new Date).not.be.date() })
    })
  })
})
