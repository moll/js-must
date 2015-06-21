var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.keys", function() {
  require("./_keys_test")("keys", true)

  require("./_assertion_error_test")(function() {
    Must({a: 1}).have.keys(["a", "b"])
  }, {
    actual: {a: 1},
    expected: ["a", "b"],
    message: "{\"a\":1} must have keys [\"a\",\"b\"]"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must({a: 1, b: 2}).not.have.keys(["a", "b"]) })
    })
  })
})
