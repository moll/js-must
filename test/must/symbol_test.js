var Must = require("../..")
var assert = require("./assert")
var describeSymbol = typeof Symbol != "undefined" ? describe : xdescribe

describeSymbol("Must.prototype.symbol", function() {
  it("must fail given null", function() {
    assert.fail(function() { Must(null).be.symbol() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be.symbol() })
  })

  it("must fail given boolean primitive", function() {
    assert.fail(function() { Must(true).be.date() })
    assert.fail(function() { Must(false).be.date() })
  })

  it("must pass given symbol", function() {
    assert.pass(function() { Must(Symbol()).be.symbol() })
  })

  it("must fail given number primitive", function() {
    assert.fail(function() { Must(42).be.symbol() })
  })

  it("must fail given string primitive", function() {
    assert.fail(function() { Must("").be.symbol() })
  })

  it("must fail given array", function() {
    assert.fail(function() { Must([]).be.symbol() })
  })

  it("must fail given object", function() {
    assert.fail(function() { Must({}).be.symbol() })
  })

  require("./_assertion_error_test")(function() { Must("").be.symbol() }, {
    actual: "",
    message: "\"\" must be a symbol"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(Symbol()).not.be.symbol() })
    })
  })
})
