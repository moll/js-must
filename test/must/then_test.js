var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.then", function() {
  it("must be an alias of Must.prototype.resolve", function() {
    var then = $.lookupGetter(Must.prototype, "then")
    var resolve = $.lookupGetter(Must.prototype, "resolve")
    assert.strictEqual(then, resolve)
  })
})
