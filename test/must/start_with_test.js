var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.startWith", function() {
  describe("given string", function() {
    it("must pass if string starts with given shorter string", function() {
      assert.pass(function() { Must("Hello, John").startWith("Hello") })
    })

    it("must fail if string does not start with given shorter string",
      function() {
      assert.fail(function() { Must("Hello, John").startWith("Bye") })
    })

    it("must fail if string ends with given shorter string", function() {
      assert.fail(function() { Must("Hello, John").startWith("John") })
    })

    it("must fail if string contains given string", function() {
      assert.fail(function() { Must("Hello").startWith("l") })
    })

    it("must fail given a longer string", function() {
      assert.fail(function() { Must("Hello").startWith("John, Hello") })
      assert.fail(function() { Must("Hello").startWith("Hello, John") })
    })
  })

  require("./_assertion_error_test")(function() {
    Must("Hello").startWith("Bye")
  }, {
    actual: "Hello",
    expected: "Bye",
    message: "\"Hello\" must start with \"Bye\""
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("Hello").not.startWith("He") })
    })
  })
})
