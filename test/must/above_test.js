var Must = require("../..")
var assert = require("./assert")

describe(".prototype.above", function() {
  it("must pass if above", function() {
    assert.pass(function() { Must(69).be.above(42) })
  })

  it("must fail if equal", function() {
    assert.fail(function() { Must(69).be.above(69) })
  })

  it("must fail if below", function() {
    assert.fail(function() { Must(69).be.above(1337) })
  })

  require("./_assertion_error_test")(function() { Must(42).be.above(69) }, {
    actual: 42,
    expected: 69,
    message: "42 must be above 69"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(69).not.be.above(42) })
    })
  })
})
