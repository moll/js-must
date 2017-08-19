var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.promise", function() {
  it("must fail given null", function () {
    assert.fail(function () { Must(null).be.promise() })
  })

  it("must fail given undefined", function () {
    assert.fail(function () { Must(undefined).be.promise() })
  })

  it("must fail given boolean primitive", function () {
    assert.fail(function () { Must(true).be.promise() })
    assert.fail(function () { Must(false).be.promise() })
  })

  it("must fail given number primitive", function () {
    assert.fail(function () { Must(42).be.promise() })
  })

  it("must fail given string primitive", function () {
    assert.fail(function () { Must("").be.promise() })
  })

  it("must fail given array", function () {
    assert.fail(function () { Must([]).be.promise() })
  })

  it("must fail given object", function () {
    assert.fail(function () { Must({}).be.promise() })
  })

  function dummy () {}

  var thenNoCatch = {then: dummy}
  var catchNoThen = {catch: dummy}
  var catchAndThen = {then: dummy, catch: dummy}

  it("must fail given an object with a then function, but not a catch function", function () {
    assert.fail(function () { Must(thenNoCatch).be.promise() })
  })

  it("must fail given an object with a catch function, but not a then function", function () {
    assert.fail(function () { Must(catchNoThen).be.promise() })
  })

  it("must pass given an object with a catch and a then function", function () {
    assert.pass(function () { Must(catchAndThen).be.promise() })
  })

  if (Promise) {
    it("must pass given a Promise implementation, with a resolved promise", function () {
      assert.pass(function () { Must(Promise.resolve(42)).be.promise() })
    })

    it("must pass given a Promise implementation, with a rejected promise", function () {
      assert.pass(function () { Must(Promise.resolve(new Error())).be.promise() })
    })
  }

  require("./_assertion_error_test")(function() { Must(catchNoThen).be.promise() }, {
    actual: catchNoThen,
    message: "{} must be a promise (i.e., have a \'then\' and a \'catch\' function)"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(catchAndThen).not.be.promise() })
    })
  })
})
