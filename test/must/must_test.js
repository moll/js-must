var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.must", function() {
  it("must return self", function() {
    var must = Must(true)
    assert.strictEqual(must.must, must)
  })
})
