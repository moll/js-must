var O = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.eventually", function() {
  it("must be an alias of Must.prototype.resolve", function() {
    var eventually = O.lookupGetter(Must.prototype, "eventually")
    var resolve = O.lookupGetter(Must.prototype, "resolve")
    assert.strictEqual(eventually, resolve)
  })
})
