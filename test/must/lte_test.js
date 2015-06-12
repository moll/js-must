var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.lte", function() {
  it("must be an alias of Must.prototype.most", function() {
    assert.strictEqual(Must.prototype.lte, Must.prototype.most)
  })
})
