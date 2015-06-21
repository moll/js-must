var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.function", function() {
  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.function() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.function() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.function() })
    assert.fail(function() { Must(false).be.function() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(0).be.function() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.function() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.function() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.function() })
  })

  it("must pass given function", function() {
    assert.pass(function() { Must(function() {}).be.function() })
  })

  it("must pass given a function with changed __proto__", function() {
    function fn() {}
    /* eslint no-proto: 0 */
    fn.__proto__ = {}
    assert.pass(function() { Must(fn).be.function() })
  })

  require("./_assertion_error_test")(function() { Must(42).be.function() }, {
    actual: 42,
    message: "42 must be a function"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(function() {}).not.be.function() })
    })
  })
})
