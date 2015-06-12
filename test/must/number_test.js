describe("Must.prototype.number", function() {
  // Allow using new Boolean:
  /* jshint -W053 */

  require("./_type_test")("number", "be a number", {
    literal: 0,
    object: new Number
  }, "0")
})
