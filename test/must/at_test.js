var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.at", function() {
  it("must return self", function() {
    var must = Must(true)
    assert.strictEqual(must.at, must)
  })
})
