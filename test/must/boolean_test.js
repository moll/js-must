describe("Must.prototype.boolean", function() {
  // Allow using new Boolean:
  /* jshint -W053 */

  require("./_type_test")("boolean", "be a boolean", {
    "true literal": true,
    "false literal": false,
    "true object": new Boolean(true),
    "false object": new Boolean(false)
  }, "true")
})
