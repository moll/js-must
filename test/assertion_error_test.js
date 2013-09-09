var assert = require("assert")
var AssertionError = require("../lib/assertion_error")

describe("AssertionError", function() {
  it("must be named \"AssertionError\"", function() {
    var error = new AssertionError("foo")
    assert.strictEqual(error.name, "AssertionError")
  })

  it("must be an instance of Error", function() {
    var error = new AssertionError("foo")
    assert(error instanceof Error)
  })

  it("must have a constructor property", function() {
    assert.strictEqual(new AssertionError().constructor, AssertionError)
  })

  it("must have constructor as non-enumerable property", function() {
    var error = new AssertionError
    for (var key in error) assert.notEqual(key, "constructor")
  })
})
