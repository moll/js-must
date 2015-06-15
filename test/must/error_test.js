var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.error", function() {
  require("./_error_test")("error", function(err) { return err })

  describe("given nothing", function() {
    it("must pass given error with no message", function() {
      assert.pass(function() { Must(new Error).error() })
    })

    it("must pass given error with message", function() {
      assert.pass(function() { Must(new Error("Problem")).error() })
    })

    it("must fail given undefined", function() {
      assert.fail(function() { Must(undefined).error() })
    })

    it("must fail given null", function() {
      assert.fail(function() { Must(null).error() })
    })

    it("must fail given a string", function() {
      assert.fail(function() { Must("").error() })
    })

    it("must fail given an object", function() {
      assert.fail(function() { Must({}).error() })
    })

    require("./_assertion_error_test")(function() { Must(42).error() }, {
      actual: 42,
      message: "42 must be an error"
    })
  })

  describe("given String", function() {
    var err = new Error("Problem")
    require("./_assertion_error_test")(function() {
      Must(err).error("Oh no!")
    }, {
      actual: err,
      expected: "Oh no!",
      message: "{\"message\":\"Problem\"} must be an error matching \"Oh no!\""
    })
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(new Error).not.error() })
    })
  })
})
