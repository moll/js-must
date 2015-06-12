var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.instanceOf", function() {
  it("must be an alias of Must.prototype.instanceof", function() {
    assert.strictEqual(Must.prototype.instanceOf, Must.prototype.instanceof)
  })
})
