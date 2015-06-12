describe("Must.prototype.array", function() {
  require("./_type_test")("array", "be an array", {
    literal: [],
    object: new Array
  }, "[]")
})
