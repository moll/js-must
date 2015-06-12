var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.gte", function() {
  it("must be an alias of Must.prototype.least", function() {
    assert.strictEqual(Must.prototype.gte, Must.prototype.least)
  })
})
