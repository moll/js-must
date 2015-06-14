var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.eventually", function() {
  it("must be an alias of Must.prototype.then", function() {
    var then = $.lookupGetter(Must.prototype, "then")
    var eventually = $.lookupGetter(Must.prototype, "eventually")
    assert.strictEqual(eventually, then)
  })
})
