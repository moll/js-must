var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.ownKeys", function() {
  require("./_keys_test")("ownKeys", false)

  require("./_assertion_error_test")(function() {
    Must({a: 1}).have.ownKeys(["a", "b"])
  }, {
    actual: {a: 1},
    expected: ["a", "b"],
    message: "{\"a\":1} must have own keys [\"a\",\"b\"]"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() {
        Must({a: 1, b: 2}).not.have.ownKeys(["a", "b"])
      })
    })
  })
})
