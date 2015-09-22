var O = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.an", function() {
  it("must be an alias of Must.prototype.a", function() {
    var a = O.lookupGetter(Must.prototype, "a")
    var an = O.lookupGetter(Must.prototype, "an")
    assert.strictEqual(an, a)
  })
})
