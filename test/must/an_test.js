var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.an", function() {
  it("must be an alias of Must.prototype.a", function() {
    var a = Object.getOwnPropertyDescriptor(Must.prototype, "a").get
    var an = Object.getOwnPropertyDescriptor(Must.prototype, "an").get
    assert.strictEqual(an, a)
  })
})
