var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.be", function() {
  it("must return an instance of Must", function() {
    assert(Must(true).be instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.pass(function() { Must(true).be.true() })
  })

  it("must be like Must.prototype.equal", function() {
    assert.pass(function() { Must(false).be(false) })
    assert.fail(function() { Must(true).be(false) })

    assert.pass(function() { Must(42).be(42) })
    assert.fail(function() { Must(42).be(1337) })

    assert.pass(function() { var obj = {}; Must(obj).be(obj) })
    assert.fail(function() { Must({}).be({}) })
  })

  require("./_assertion_error_test")(function() { Must(true).be(42) }, {
    actual: true,
    expected: 42,
    message: "true must equal 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(true).not.be(true) })
    })

    it("must carry over the current state", function() {
      assert.fail(function() { Must(true).not.be.true() })
    })
  })
})
