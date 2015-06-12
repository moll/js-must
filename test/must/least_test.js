var Must = require("../..")
var assert = require("./assert")

describe(".prototype.least", function() {
  it("must pass if above", function() {
    assert.pass(function() { Must(69).be.at.least(42) })
  })

  it("must pass if equal", function() {
    assert.pass(function() { Must(69).be.at.least(69) })
  })

  it("must fail if below", function() {
    assert.fail(function() { Must(69).be.at.least(1337) })
  })

  require("./_assertion_error_test")(function() { Must(42).be.at.least(69) }, {
    actual: 42,
    expected: 69,
    message: "42 must be at least 69"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(69).not.be.at.least(42) })
    })
  })
})
