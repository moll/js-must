var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.an", function() {
  it("must be an alias of Must.prototype.a", function() {
    var a = $.lookupGetter(Must.prototype, "a")
    var an = $.lookupGetter(Must.prototype, "an")
    assert.strictEqual(an, a)
  })
})
