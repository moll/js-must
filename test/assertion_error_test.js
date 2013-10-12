var assert = require("assert")
var AssertionError = require("../lib/assertion_error")

describe("AssertionError", function() {
  it("must be named \"AssertionError\"", function() {
    var error = new AssertionError("foo")
    assert.strictEqual(error.name, "AssertionError")
  })

  it("must have a constructor property", function() {
    assert.strictEqual(new AssertionError().constructor, AssertionError)
  })

  it("must have constructor as a non-enumerable property", function() {
    var error = new AssertionError
    for (var key in error) assert.notEqual(key, "constructor")
  })

  it("must have name", function() {
    assert.strictEqual(AssertionError.name, "AssertionError")
  })

  describe("new", function() {
    it("must be an instance of AssertionError", function() {
      var error = new AssertionError("foo")
      assert(error instanceof AssertionError)
    })

    it("must be an instance of Error", function() {
      var error = new AssertionError("foo")
      assert(error instanceof Error)
    })

    it("must set actual if given", function() {
      var actual = {}
      var error = new AssertionError("", {actual: actual})
      assert.strictEqual(error.actual, actual)
    })

    it("must not set actual if not given", function() {
      var error = new AssertionError("")
      assert(!("actual" in error))
    })

    it("must set expected if given", function() {
      var expected = {}
      var error = new AssertionError("", {expected: expected})
      assert.strictEqual(error.expected, expected)
    })

    it("must not set expected if not given", function() {
      var error = new AssertionError("")
      assert(!("expected" in error))
    })

    it("must set diffable if given", function() {
      var error = new AssertionError("", {diffable: true})
      assert.strictEqual(error.diffable, true)
    })

    it("must not set diffable if not given", function() {
      var error = new AssertionError("")
      assert(!("diffable" in error))
    })
  })

  describe(".prototype.showDiff", function() {
    it("must return the value of diffable", function() {
      var diffable = new AssertionError("", {diffable: true})
      assert.strictEqual(diffable.showDiff, true)

      var undiffable = new AssertionError("", {diffable: false})
      assert.strictEqual(undiffable.showDiff, false)
    })
  })
})
