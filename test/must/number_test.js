var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.number", function() {
  // Allow using new Number:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.number() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.number() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.date() })
    assert.fail(function() { Must(false).be.date() })
  })

  it("must pass given number primitive", function() {
    assert.pass(function() { Must(42).be.number() })
  })

  it("must fail given number object", function() {
    assert.fail(function() { Must(new Number(42)).be.number() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.number() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.number() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.number() })
  })

  require("./_assertion_error_test")(function() { Must("").be.number() }, {
    actual: "",
    message: "\"\" must be a number"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(42).not.be.number() })
    })
  })
})
