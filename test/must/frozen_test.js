var Must = require("../..")
var assert = require("./assert")

describe(".prototype.frozen", function() {
  it("must pass if object is frozen", function() {
    assert.pass(function() { Must(Object.freeze({})).be.frozen() })
  })

  it("must fail if object is thawed", function() {
    assert.fail(function() { Must({}).be.frozen() })
  })

  require("./_assertion_error_test")(function() { Must({}).be.frozen() }, {
    actual: {},
    message: "{} must be frozen"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(Object.freeze({})).not.be.frozen() })
    })
  })
})
