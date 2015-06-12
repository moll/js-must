var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.after", function() {
  it("must be an alias of Must.prototype.above", function() {
    assert.strictEqual(Must.prototype.after, Must.prototype.above)
  })
})
