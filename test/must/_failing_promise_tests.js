var Must = require("../..")
var assert = require("./assert")
var assertionErrorTest = require("./_assertion_error_test")

function dummy () {}

var thenNoCatch = {then: dummy}
var catchNoThen = {catch: dummy}
var catchAndThen = {then: dummy, catch: dummy}

module.exports = function(callToTest) {
  it("must fail given null", function () {
    assert.fail(function () { callToTest(Must(null)) })
  })

  it("must fail given undefined", function () {
    assert.fail(function () { callToTest(Must(undefined)) })
  })

  it("must fail given boolean primitive", function () {
    assert.fail(function () { callToTest(Must(true)) })
    assert.fail(function () { callToTest(Must(false)) })
  })

  it("must fail given number primitive", function () {
    assert.fail(function () { callToTest(Must(42)) })
  })

  it("must fail given string primitive", function () {
    assert.fail(function () { callToTest(Must("")) })
  })

  it("must fail given array", function () {
    assert.fail(function () { callToTest(Must([])) })
  })

  it("must fail given object", function () {
    assert.fail(function () { callToTest(Must({})) })
  })

  it("must fail given an object with a then function, but not a catch function", function () {
    assert.fail(function () { callToTest(Must(thenNoCatch)) })
  })

  it("must fail given an object with a catch function, but not a then function", function () {
    assert.fail(function () { callToTest(Must(catchNoThen)) })
  })

  assertionErrorTest(
    function() { callToTest(Must(catchNoThen)) },
    {
      actual: catchNoThen,
      message: "{} must be a promise (i.e., have a \'then\' and a \'catch\' function)"
    }
  )

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { callToTest(Must(catchAndThen).not) })
    })
  })
}

module.exports.thenNoCatch = thenNoCatch
module.exports.catchNoThen = catchNoThen
module.exports.catchAndThen = catchAndThen
