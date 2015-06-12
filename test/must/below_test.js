var Must = require("../..")
var assert = require("./assert")

describe(".prototype.below", function() {
  it("must pass if below", function() {
    assert.pass(function() { Must(42).be.below(69) })
  })

  it("must fail if equal", function() {
    assert.fail(function() { Must(69).be.below(69) })
  })

  it("must fail if above", function() {
    assert.fail(function() { Must(1337).be.below(69) })
  })

  require("./_assertion_error_test")(function() { Must(69).be.below(42) }, {
    actual: 69,
    expected: 42,
    message: "69 must be below 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(42).not.be.below(69) })
    })
  })
})
