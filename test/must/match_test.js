var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.match", function() {
  // Allow using new String:
  /* jshint -W053 */

  describe("given String and RegExp", function() {
    var literal = "Year 2014 might be like 1984."
    var object = new String(literal)

    it("must pass if given string literal matches", function() {
      assert.pass(function() { Must(literal).match(/^Year \d+ might/) })
    })

    it("must fail if given string literal does not match", function() {
      assert.fail(function() { Must(literal).match(/^\d+ might/) })
    })

    it("must pass if given string object matches", function() {
      assert.pass(function() { Must(object).match(/^Year \d+ might/) })
    })

    it("must fail if given string object does not match",
      function() {
      assert.fail(function() { Must(object).match(/^\d+ might/) })
    })
  })

  describe("given String and String", function() {
    var literal = "Year 2014 might be like 1984."
    var object = new String(literal)

    it("must pass if given string literal matches", function() {
      assert.pass(function() {Must(literal).match("^Year \\d+ might")})
    })

    it("must fail if given string literal does not match", function() {
      assert.fail(function() { Must(literal).match("^\\d+ might") })
    })

    it("must pass if given string object matches", function() {
      assert.pass(function() { Must(object).match("^Year \\d+ might") })
    })

    it("must fail if given string object does not match",
      function() {
      assert.fail(function() { Must(object).match("^\\d+ might") })
    })

    require("./_assertion_error_test")(function() {
      Must("1984").match("^2014$")
    }, {
      actual: "1984",
      expected: /^2014$/,
      message: "\"1984\" must match /^2014$/"
    })
  })

  require("./_assertion_error_test")(function() {
    Must("1984").match(/^2014$/)
  }, {
    actual: "1984",
    expected: /^2014$/,
    message: "\"1984\" must match /^2014$/"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("1984").not.match(/^1984$/) })
    })
  })
})
