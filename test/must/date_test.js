describe("Must.prototype.date", function() {
  require("./_type_test")("date", "be a date", {
    object: new Date(0)
  }, "1970-01-01T00:00:00.000Z")
})
