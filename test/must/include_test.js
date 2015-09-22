var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.include", function() {
  // Allow using new String:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  describe("given String", function() {
    var primitive = "Hello! How are you?"
    var object = new String(primitive)

    it("must pass if given string primitive includes string primitive",
      function() {
      assert.pass(function() { Must(primitive).include("How") })
    })

    it("must fail if given string primitive does not include string primitive",
      function() {
      assert.fail(function() { Must(primitive).include("good") })
    })

    it("must fail if given string object includes string primitive",
      function() {
      assert.fail(function() { Must(object).include("How") })
    })
  })

  describe("given Array", function() {
    it("must pass if given array includes number primitive", function() {
      assert.pass(function() { Must([1, 2, 3]).include(2) })
    })

    it("must fail if given array does not include number primitive",
      function() {
      assert.fail(function() { Must([1, 2, 3]).include(42) })
    })

    it("must fail if given array includes number object", function() {
      assert.fail(function() { Must([1, 2, 3]).include(new Number(2)) })
    })
  })

  describe("given Object", function() {
    it("must pass if given object includes number primitive", function() {
      assert.pass(function() { Must({a: 1, b: 2, c: 3}).include(2) })
    })

    it("must fail if given array does not include number primitive",
      function() {
      assert.fail(function() { Must({a: 1, b: 2, c: 3}).include(42) })
    })

    it("must fail if given array includes number object", function() {
      var obj = ({a: 1, b: 2, c: 3})
      assert.fail(function() { Must(obj).include(new Number(2)) })
    })
  })

  require("./_assertion_error_test")(function() {
    Must([1, 2, 3]).include(42)
  }, {
    actual: [1, 2, 3],
    expected: 42,
    message: "[1,2,3] must include 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([1, 42, 3]).not.include(42) })
    })
  })
})
