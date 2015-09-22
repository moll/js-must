var O = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.is", function() {
  it("must be an alias of Must.prototype.be", function() {
    var be = O.lookupGetter(Must.prototype, "be")
    var is = O.lookupGetter(Must.prototype, "is")
    assert.strictEqual(is, be)
  })
})
