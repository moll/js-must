var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.not", function() {
  it("must return an instance of Must", function() {
    assert(Must(true).not instanceof Must)
  })

  it("must invert condition", function() {
    assert.pass(function() { Must(false).not.equal(true) })
  })

  it("must invert condition multiple times", function() {
    assert.pass(function() { Must(true).not.not.equal(true) })
  })

  it("must not modify existing instance of Must", function() {
    var must = Must(true)
    assert.fail(function() { must.not.equal(true) })
    assert.pass(function() { must.equal(true) })
  })

  it("must inherit from existing instance", function() {
    var must = Must(true)
    assert.strictEqual(Object.getPrototypeOf(must.not), must)
  })
})
