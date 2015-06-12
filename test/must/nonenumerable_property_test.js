var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.nonenumerableProperty", function() {
  it("must be an alias of Must.prototype.nonenumerable", function() {
    var nonenumerable = Must.prototype.nonenumerable
    assert.strictEqual(Must.prototype.nonenumerableProperty, nonenumerable)
  })
})
