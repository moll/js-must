var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.assert", function() {
  it("must not be enumerable", function() {
    assert($.keys(Must(undefined)).indexOf("assert") == -1)
  })
})
