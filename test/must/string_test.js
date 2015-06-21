var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.string", function() {
  // Allow using new String:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.string() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.string() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.date() })
    assert.fail(function() { Must(false).be.date() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.string() })
  })

  it("must pass given string primitive", function() {
    assert.pass(function() { Must("").be.string() })
  })

  it("must fail given string object", function() {
    assert.fail(function() { Must(new String("")).be.string() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.string() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.string() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.string() }, {
    actual: 42,
    message: "42 must be a string"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("").not.be.string() })
    })
  })
})
