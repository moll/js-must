var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.throw", function() {
  /* eslint no-throw-literal: 0 */

  require("./_error_test")("throw", function(err) {
    return function() { throw err }
  })

  it("must invoke function in no context", function() {
    "use strict"
    var context
    Must(function() { context = this }).not.throw()
    assert.strictEqual(context, null)
  })

  describe("given nothing", function() {
    it("must pass if function throws", function() {
      assert.pass(function() { Must(function() { throw 5 }).throw() })
    })

    it("must pass even if function throws undefined", function() {
      assert.pass(function() { Must(function() { throw undefined }).throw() })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw() })
    })

    function noThrower() { void 42 }
    require("./_assertion_error_test")(function() { Must(noThrower).throw() }, {
      actual: undefined,
      message: "function noThrower() { void 42 } must throw"
    })
  })

  describe("given null", function() {
    it("must pass if function throws null", function() {
      assert.pass(function() {
        Must(function() { throw null }).throw(null)
      })
    })

    it("must fail if function throws undefined", function() {
      assert.fail(function() {
        Must(function() { throw undefined }).throw(null)
      })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw(null) })
    })
  })

  describe("given undefined", function() {
    it("must pass if function throws undefined", function() {
      assert.pass(function() {
        Must(function() { throw undefined }).throw(undefined)
      })
    })

    it("must fail if function throws null", function() {
      assert.fail(function() {
        Must(function() { throw null }).throw(undefined)
      })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw(undefined) })
    })
  })

  describe("given String", function() {
    function stringThrower() { throw "Oh no!" }

    it("must pass if function throws an identical string", function() {
      assert.pass(function() { Must(stringThrower).throw("Oh no!") })
    })

    it("must fail if function throws with part of identical string",
      function() {
      assert.fail(function() { Must(stringThrower).throw("Oh no") })
    })

    it("must fail if function throws an equivalent number", function() {
      assert.fail(function() { Must(function() { throw 42 }).throw("42") })
    })

    it("must fail if function throws an unequivalent string", function() {
      assert.fail(function() { Must(stringThrower).throw("Oh yes!") })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw("Oh no!") })
    })

    function thrower() { throw "Nope!" }
    require("./_assertion_error_test")(function() {
      Must(thrower).throw("Oh no!")
    }, {
      actual: "Nope!",
      expected: "Oh no!",
      message: "function thrower() { throw \"Nope!\" } must throw \"Oh no!\""
    })
  })

  describe("given RegExp", function() {
    function stringThrower() { throw "Oh no!" }

    it("must pass if function throws an matching string", function() {
      assert.pass(function() { Must(stringThrower).throw(/no!/) })
    })

    it("must fail if function throws an unmatching string", function() {
      assert.fail(function() { Must(stringThrower).throw(/yes!/) })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw(/no!/) })
    })
  })

  describe("given Function", function() {
    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(noop).throw(Error) })
    })
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must(function() { throw 42 }).not.throw() })
    })
  })
})

function noop() {}
