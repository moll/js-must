describe("Must.prototype.regexp", function() {
  require("./_type_test")("regexp", "be a regular expression", {
    object: new RegExp
  }, "/(?:)/")
})
