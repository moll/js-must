var Must = require("../..")
var assert = require("./assert")

describe(".prototype.most", function() {
  it("must pass if below", function() {
    assert.pass(function() { Must(42).be.at.most(69) })
  })

  it("must pass if equal", function() {
    assert.pass(function() { Must(69).be.at.most(69) })
  })

  it("must fail if above", function() {
    assert.fail(function() { Must(1337).be.at.most(69) })
  })

  require("./_assertion_error_test")(function() { Must(69).be.at.most(42) }, {
    actual: 69,
    expected: 42,
    message: "69 must be at most 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(42).not.be.at.most(69) })
    })
  })
})
