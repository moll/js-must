var O = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.then", function() {
  it("must be an alias of Must.prototype.resolve", function() {
    var then = O.lookupGetter(Must.prototype, "then")
    var resolve = O.lookupGetter(Must.prototype, "resolve")
    assert.strictEqual(then, resolve)
  })
})
