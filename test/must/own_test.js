var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.own", function() {
  it("must be an alias of Must.prototype.ownProperty", function() {
    assert.strictEqual(Must.prototype.own, Must.prototype.ownProperty)
  })
})
