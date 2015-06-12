var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, msg, values, inspect) {
  var valid

  $.each(values, function(value, type) {
    if (valid == null) valid = value

    it("must pass given "+name+" "+type, function() {
      assert.pass(function() { Must(value).be[name]() })
    })
  })

  it("must fail given null", function() {
    assert.fail(function() { Must(null).be[name]() })
  })

  it("must fail given undefined", function() {
    assert.fail(function() { Must(undefined).be[name]() })
  })

  if (name != "boolean") it("must fail given true literal", function() {
    assert.fail(function() { Must(true).be[name]() })
  })

  if (name != "boolean") it("must fail given false literal", function() {
    assert.fail(function() { Must(false).be[name]() })
  })

  if (name != "number") it("must fail given number literal", function() {
    assert.fail(function() { Must(0).be[name]() })
  })

  if (name != "string") it("must fail given string literal", function() {
    assert.fail(function() { Must("").be[name]() })
  })

  require("./_assertion_error_test")(function() { Must(null).be[name]() }, {
    actual: null,
    message: "null must " + msg
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(valid).not.be[name]() })
    })
  })
}
