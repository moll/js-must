var Must = require("../..")
var assert = require("./assert")

// Can't test an alias because getter functions apparently aren't aliased.
module.exports = function(name) {
  it("must return an instance of Must", function() {
    assert(Must(true)[name] instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.pass(function() { Must([]).be[name].instanceof(Array) })
  })

  it("must be like Must.prototype.instanceof", function() {
    assert.pass(function() { Must([]).be[name](Array) })
    assert.fail(function() { Must(/a/).be[name](Array) })
  })

  require("./_assertion_error_test")(function() { Must("").be[name](Array) }, {
    actual: "",
    expected: Array,
    message: "\"\" must be an instance of Array"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([]).not.be[name](Array) })
    })

    it("must carry over the current state", function() {
      assert.fail(function() { Must(true).not.be[name].truthy() })
    })
  })
}
