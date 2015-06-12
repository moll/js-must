var Must = require("../..")
var assert = require("./assert")

module.exports = function(name) {
  it("must return an instance of Must", function() {
    assert(Must(true)[name] instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.pass(function() { Must(true)[name].true() })
  })

  it("must be like Must.prototype.equal", function() {
    assert.pass(function() { Must(false)[name](false) })
    assert.fail(function() { Must(true)[name](false) })

    assert.pass(function() { Must(42)[name](42) })
    assert.fail(function() { Must(42)[name](1337) })

    assert.pass(function() { var obj = {}; Must(obj)[name](obj) })
    assert.fail(function() { Must({})[name]({}) })
  })

  require("./_assertion_error_test")(function() { Must(true)[name](42) }, {
    actual: true,
    expected: 42,
    message: "true must equal 42"
  })

  describe(".not", function() {
    function not() { Must(true).not[name](true) }

    it("must invert the assertion", function() {
      assert.fail(not)
    })

    it("must carry over the current state", function() {
      assert.fail(function() { Must(true).not[name].true() })
    })

    require("./_assertion_error_test")(not, {
      actual: true,
      expected: true,
      message: "true must not equal true"
    })
  })
}
