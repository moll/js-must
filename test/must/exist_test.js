var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.exist", function() {
  it("must fail if null", function() {
    assert.fail(function() { Must(null).exist() })
  })

  it("must fail if undefined", function() {
    assert.fail(function() { Must(undefined).exist() })
  })

  it("must pass if true", function() {
    assert.pass(function() { Must(true).exist() })
  })

  it("must pass if false", function() {
    assert.pass(function() { Must(false).exist() })
  })

  it("must pass if an object", function() {
    assert.pass(function() { Must({}).exist() })
  })

  require("./_assertion_error_test")(function() { Must(null).exist() }, {
    actual: null,
    message: "null must exist"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(true).not.exist() })
    })
  })
})
