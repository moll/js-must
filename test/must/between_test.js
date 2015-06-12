var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.between", function() {
  it("must fail if below", function() {
    assert.fail(function() { Must(41).be.between(42, 69) })
  })

  it("must pass if on lower bound", function() {
    assert.pass(function() { Must(42).be.between(42, 69) })
  })

  it("must pass if between", function() {
    assert.pass(function() { Must(50).be.between(42, 69) })
  })

  it("must pass if on higher bound", function() {
    assert.pass(function() { Must(69).be.between(42, 69) })
  })

  it("must fail if above", function() {
    assert.fail(function() { Must(70).be.between(42, 69) })
  })

  require("./_assertion_error_test")(function() {
    Must(13).be.between(42, 69)
  }, {
    actual: 13,
    message: "13 must be between 42 and 69"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(50).not.be.between(42, 69) })
    })
  })
})
