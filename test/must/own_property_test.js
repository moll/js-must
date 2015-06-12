var Must = require("../..")
var assert = require("./assert")

describe(".prototype.ownProperty", function() {
  require("./_property_test")("ownProperty", false)

  it("must pass if object has property named hasOwnProperty", function() {
    assert.pass(function() {
      Must({hasOwnProperty: false}).have.ownProperty("hasOwnProperty")
    })
  })
})
