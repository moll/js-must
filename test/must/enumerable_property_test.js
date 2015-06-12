var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.enumerableProperty", function() {
  it("must be an alias of Must.prototype.enumerable", function() {
    var enumerable = Must.prototype.enumerable
    assert.strictEqual(Must.prototype.enumerableProperty, enumerable)
  })
})
