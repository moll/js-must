var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.is", function() {
  it("must be an alias of Must.prototype.be", function() {
    var be = Object.getOwnPropertyDescriptor(Must.prototype, "be").get
    var is = Object.getOwnPropertyDescriptor(Must.prototype, "is").get
    assert.strictEqual(is, be)
  })
})
