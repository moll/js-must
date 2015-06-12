var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.gt", function() {
  it("must be an alias of Must.prototype.above", function() {
    assert.strictEqual(Must.prototype.gt, Must.prototype.above)
  })
})
