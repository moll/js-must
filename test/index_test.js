// Bootstrapping with Assert ^_^:
var assert = require("assert")
var must = require("..")

describe("Object", function() {
  it("must have .must", function() {
    assert(({}).must)
  })

  it("must return an instance of Must", function() {
    assert(({}).must instanceof must)
  })

  it("must be have .must as reconfigurable", function() {
    delete Object.prototype.must
    assert(!({}).must)
  })
})
