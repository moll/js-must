var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, truthy) {
  // Allow using new Boolean:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.fail : assert.pass
  var doesNotThrow = truthy ? assert.pass : assert.fail

  it("must "+pass+" given true primitive", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must fail given true object", function() {
    assert.fail(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false primitive", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must fail given false object", function() {
    assert.fail(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).be[name]() })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).be[name]() })
  })

  it("must fail given zero number primitive", function() {
    assert.fail(function() { Must(0).be[name]() })
  })

  it("must fail given an empty string", function() {
    assert.fail(function() { Must("").be[name]() })
  })

  require("./_assertion_error_test")(function() { Must(!truthy).be[name]() }, {
    actual: !truthy,
    expected: truthy,
    message: !truthy + " must be " + truthy
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(truthy).not.be[name]() })
    })
  })
}
