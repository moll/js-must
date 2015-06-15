var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.eventually", function() {
  it("must be an alias of Must.prototype.resolve", function() {
    var eventually = $.lookupGetter(Must.prototype, "eventually")
    var resolve = $.lookupGetter(Must.prototype, "resolve")
    assert.strictEqual(eventually, resolve)
  })
})
