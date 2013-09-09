var assert = require("assert")
var Must = require("..")

describe("Must.AssertionError", function() {
  it("must be named \"AssertionError\"", function() {
    var error = new Must.AssertionError("foo")
    assert.strictEqual(error.name, "AssertionError")
  })

  it("must be an instance of Error", function() {
    var error = new Must.AssertionError("foo")
    assert(error instanceof Error)
  })

  it("must have the right constructor", function() {
    var error = new Must.AssertionError("foo")
    assert.strictEqual(error.constructor, Must.AssertionError)
  })

  it("must have constructor as non-enumerable property", function() {
    var error = new Must.AssertionError("foo")
    for (var key in error) assert.notEqual(key, "constructor")
  })
})
