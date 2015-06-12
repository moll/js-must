var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.before", function() {
  it("must be an alias of Must.prototype.below", function() {
    assert.strictEqual(Must.prototype.before, Must.prototype.below)
  })
})
