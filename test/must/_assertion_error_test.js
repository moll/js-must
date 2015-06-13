var Must = require("../..")
var assert = require("assert")

module.exports = function(test, props) {
  describe("AssertionError", function() {
    it("must be thrown", function() {
      assert.throws(test, Must.AssertionError)
    })

    it("must have all properties", function() {
      try { test() } catch (ex) { assert.deepEqual(ex, props) }
    })

    it("must have correct stack trace", function() {
      try { test() }
      catch (ex) {
        var stack = ex.stack.split(/\r?\n/)
        assert(stack[0].match(/AssertionError/, "must include AssertionError"))
        assert(stack[1].match(/[\\\/]test[\\\/]/), "must have test at top")
      }
    })
  })
}
