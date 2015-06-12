describe("Must.prototype.string", function() {
  // Allow using new String:
  /* jshint -W053 */

  require("./_type_test")("string", "be a string", {
    literal: "",
    object: new String
  }, "\"\"")
})
