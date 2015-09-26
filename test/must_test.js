// Bootstrapping with Assert ^_^:
var Must = require("..")
var assert = require("assert")

describe("Must", function() {
  it("must return an instance of itself when called as a function", function() {
    assert(Must() instanceof Must)
  })

  it("must have a constructor property", function() {
    assert.strictEqual(new Must().constructor, Must)
  })

  it("must have constructor as a non-enumerable property", function() {
    var must = new Must
    for (var key in must) assert.notEqual(key, "constructor")
  })

  it("must have name", function() {
    assert.strictEqual(Must.name, "Must")
  })

  describe("new", function() {
    it("must return an instance of Must", function() {
      assert(new Must instanceof Must)
    })

    describe("given message", function() {
      require("./must/_assertion_error_test")(function() {
        Must(false, "Negativity").true()
      }, {
        actual: false,
        expected: true,
        message: "Negativity: false must be true"
      })
    })
  })
})
