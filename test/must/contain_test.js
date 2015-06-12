var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.contain", function() {
  it("must be an alias of Must.prototype.include", function() {
    assert.strictEqual(Must.prototype.contain, Must.prototype.include)
  })
})
