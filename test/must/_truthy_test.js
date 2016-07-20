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

  it("must "+fail+" given null", function() {
    throws(function() { Must(null).be[name]() })
  })

  it("must "+fail+" given undefined", function() {
    throws(function() { Must(undefined).be[name]() })
  })

  describe("given Boolean", function() {
    it("must "+pass+" given true primitive", function() {
      doesNotThrow(function() { Must(true).be[name]() })
    })

    it("must "+pass+" given true object", function() {
      doesNotThrow(function() { Must(new Boolean(true)).be[name]() })
    })

    it("must "+fail+" given false primitive", function() {
      throws(function() { Must(false).be[name]() })
    })

    it("must "+pass+" given false object", function() {
      doesNotThrow(function() { Must(new Boolean(false)).be[name]() })
    })
  })

  describe("given Number", function() {
    it("must "+pass+" given primitive", function() {
      doesNotThrow(function() { Must(1).be[name]() })
    })

    it("must "+pass+" given object", function() {
      doesNotThrow(function() { Must(new Number(1)).be[name]() })
    })

    it("must "+fail+" given zero primitive", function() {
      throws(function() { Must(0).be[name]() })
    })

    it("must "+pass+" given zero object", function() {
      doesNotThrow(function() { Must(new Number(0)).be[name]() })
    })
  })

  describe("given String", function() {
    it("must "+pass+" given primitive", function() {
      doesNotThrow(function() { Must("truthy").be[name]() })
    })

    it("must "+pass+" given object", function() {
      doesNotThrow(function() { Must(new String("truthy")).be[name]() })
    })

    it("must "+pass+" given zero primitive", function() {
      doesNotThrow(function() { Must("0").be[name]() })
    })

    it("must "+pass+" given zero object", function() {
      doesNotThrow(function() { Must(new String("0")).be[name]() })
    })

    it("must "+fail+" given empty primitive", function() {
      throws(function() { Must("").be[name]() })
    })

    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must(new String("")).be[name]() })
    })
  })

  describe("given RegExp", function() {
    it("must "+pass+" given regexp", function() {
      doesNotThrow(function() { Must(new RegExp).be[name]() })
    })
  })

  describe("given Date", function() {
    it("must "+pass+" given date", function() {
      doesNotThrow(function() { Must(new Date(0)).be[name]() })
    })
  })

  describe("given Array", function() {
    it("must "+pass+" given empty array", function() {
      doesNotThrow(function() { Must([]).be[name]() })
    })
  })

  describe("given Function", function() {
    it("must "+pass+" given function", function() {
      doesNotThrow(function() { Must(function() {}).be[name]() })
    })
  })

  describe("given Object", function() {
    it("must "+pass+" given empty object", function() {
      doesNotThrow(function() { Must({}).be[name]() })
    })
  })

  it("must not do anything when not called as a function", function() {
    assert.pass(function() { void Must(!truthy).be[name] })
  })

  require("./_assertion_error_test")(function() { Must(!truthy).be[name]() }, {
    actual: !truthy,
    message: !truthy + " must be " + name
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(truthy).not.be[name]() })
    })
  })
}
