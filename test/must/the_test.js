var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.the", function() {
  it("must return self", function() {
    var must = Must(true)
    assert.strictEqual(must.the, must)
  })
})
