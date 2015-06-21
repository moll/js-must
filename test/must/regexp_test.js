var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.regexp", function() {
  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.regexp() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.regexp() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.regexp() })
    assert.fail(function() { Must(false).be.regexp() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.regexp() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.regexp() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.regexp() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.regexp() })
  })

  it("must pass given a regexp", function() {
    assert.pass(function() { Must(/.*/).be.regexp() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.regexp() }, {
    actual: 42,
    message: "42 must be a regular expression"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(/.*/).not.be.regexp() })
    })
  })
})
