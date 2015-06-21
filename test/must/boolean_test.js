var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.boolean", function() {
  // Allow using new Boolean:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.boolean() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.boolean() })
  })

  it("must pass given boolean primitive", function() {
    assert.pass(function() { Must(true).be.boolean() })
    assert.pass(function() { Must(false).be.boolean() })
  })

  it("must fail given boolean object", function() {
    assert.fail(function() { Must(new Boolean(true)).be.boolean() })
    assert.fail(function() { Must(new Boolean(false)).be.boolean() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.boolean() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.boolean() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.boolean() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.boolean() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.boolean() }, {
    actual: 42,
    message: "42 must be a boolean"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(true).not.be.boolean() })
    })
  })
})
