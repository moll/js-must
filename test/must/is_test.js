var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.is", function() {
  it("must be an alias of Must.prototype.be", function() {
    var be = $.lookupGetter(Must.prototype, "be")
    var is = $.lookupGetter(Must.prototype, "is")
    assert.strictEqual(is, be)
  })
})
