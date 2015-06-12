var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.lt", function() {
  it("must be an alias of Must.prototype.below", function() {
    assert.strictEqual(Must.prototype.lt, Must.prototype.below)
  })
})
