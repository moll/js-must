var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.function", function() {
  require("./_type_test")("function", "be a function", {
    object: function() {}
  }, "function () {}")

  it("must pass given a function with changed __proto__", function() {
    function fn() {}
    fn.__proto__ = {}
    assert.pass(function() { Must(fn).be.function() })
  })
})
