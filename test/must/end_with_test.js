var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.endWith", function() {
  describe("given string", function() {
    it("must pass if string ends with given shorter string", function() {
      assert.pass(function() { Must("Hello, John").endWith("John") })
    })

    it("must fail if string does not end with given shorter string",
      function() {
      assert.fail(function() { Must("Hello, John").endWith("Mike") })
    })

    it("must fail if string starts with given shorter string", function() {
      assert.fail(function() { Must("Hello, John").endWith("Hello") })
    })

    it("must fail if string contains given string", function() {
      assert.fail(function() { Must("Hello").endWith("l") })
    })

    it("must fail given a longer string", function() {
      assert.fail(function() { Must("Hello").endWith("John, Hello") })
      assert.fail(function() { Must("Hello").endWith("Hello, John") })
    })
  })

  require("./_assertion_error_test")(function() {
    Must("Hello").endWith("Bye")
  }, {
    actual: "Hello",
    expected: "Bye",
    message: "\"Hello\" must end with \"Bye\""
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("Hello").not.endWith("lo") })
    })
  })
})
