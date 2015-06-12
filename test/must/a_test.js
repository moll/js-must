var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.a", function() {
  it("must return an instance of Must", function() {
    assert(Must(true).a instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.pass(function() { Must([]).be.a.instanceof(Array) })
  })

  it("must be like Must.prototype.instanceof", function() {
    assert.pass(function() { Must([]).be.a(Array) })
    assert.fail(function() { Must({}).be.a(Array) })
  })

  require("./_assertion_error_test")(function() { Must("").be.a(Array) }, {
    actual: "",
    expected: Array,
    message: "\"\" must be an instance of Array"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([]).not.be.a(Array) })
    })

    it("must carry over the current state", function() {
      assert.fail(function() { Must(true).not.be.a.truthy() })
    })
  })
})
