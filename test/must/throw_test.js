var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.throw", function() {
  describe("given nothing", function() {
    it("must pass if function throws", function() {
      assert.pass(function() { Must(function() { throw 5 }).throw() })
    })

    it("must pass even if function throws undefined", function() {
      assert.pass(function() { Must(function() { throw undefined }).throw() })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(function() {}).throw() })
    })
  })

  describe("given String", function() {
    function thrower() { throw new Error("Oh no!") }
    function stringThrower() { throw new Error("Oh no!") }

    it("must pass if function throws with identical message", function() {
      assert.pass(function() { Must(thrower).throw("Oh no!") })
    })

    it("must fail if function throws with part of identical message",
      function() {
      assert.fail(function() { Must(thrower).throw("Oh no") })
    })

    it("must fail if function throws with unequivalent message", function() {
      assert.fail(function() { Must(thrower).throw("Oh yes!") })
    })

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
      assert.fail(function() { Must(function() {}).throw("Oh no!") })
    })
  })

  describe("given RegExp", function() {
    function thrower() { throw new Error("Oh no!") }
    function stringThrower() { throw new Error("Oh no!") }

    it("must pass if function throws with matching message", function() {
      assert.pass(function() { Must(thrower).throw(/no!/) })
    })

    it("must fail if function throws with unmatching message", function() {
      assert.fail(function() { Must(thrower).throw(/yes!/) })
    })

    it("must pass if function throws an matching string", function() {
      assert.pass(function() { Must(stringThrower).throw(/no!/) })
    })

    it("must fail if function throws an unmatching string", function() {
      assert.fail(function() { Must(stringThrower).throw(/yes!/) })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(function() {}).throw(/no!/) })
    })
  })

  describe("given Function", function() {
    function MyError() {}

    it("must pass if function throws instance of function", function() {
      assert.pass(function() {
        Must(function() { throw new MyError }).throw(MyError)
      })
    })

    it("must fail if function throws instance of other function", function() {
      assert.fail(function() {
        Must(function() { throw new Error }).throw(MyError)
      })
    })

    it("must fail if function does not throw", function() {
      assert.fail(function() { Must(function() {}).throw(MyError) })
    })

    describe("with String", function() {
      function thrower() { throw new TypeError("Oh no!") }

      it("must pass if function throws with identical message", function() {
        assert.pass(function() { Must(thrower).throw(TypeError, "Oh no!") })
      })

      it("must fail if function throws other instance", function() {
        assert.fail(function() { Must(thrower).throw(RangeError, "Oh no!") })
      })

      it("must fail if function throws with part of identical message",
        function() {
        assert.fail(function() { Must(thrower).throw(TypeError, "Oh no") })
      })

      it("must fail if function throws with unequivalent message", function() {
        assert.fail(function() { Must(thrower).throw(TypeError, "Oh yes!") })
      })
    })

    describe("with RegExp", function() {
      function thrower() { throw new TypeError("Oh no!") }

      it("must pass if function throws with matching message", function() {
        assert.pass(function() { Must(thrower).throw(TypeError, /no!/) })
      })

      it("must fail if function throws other instsance", function() {
        assert.fail(function() { Must(thrower).throw(RangeError, /no!/) })
      })

      it("must fail if function throws with unmatching message", function() {
        assert.fail(function() { Must(thrower).throw(TypeError, /yes!/) })
      })
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
      assert.fail(function() { Must(function() {}).throw(null) })
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
      assert.fail(function() { Must(function() {}).throw(undefined) })
    })
  })

  it("must invoke function in global context", function() {
    var context
    function fn() { context = this }
    Must(fn).not.throw()
    assert.strictEqual(context, global)
  })

  var noThrower = function() { 42 }
  require("./_assertion_error_test")(function() { Must(noThrower).throw() }, {
    actual: noThrower,
    message: "function () { 42 } must throw"
  })

  describe(".not", function() {
    function thrower() { throw 42 }

    it("must invert the assertion", function() {
      assert.fail(function() { Must(thrower).not.throw() })
    })
  })

  describe("given anything", function() {
    var thrower = function() { throw "Nope!" }
    require("./_assertion_error_test")(function() {
      Must(thrower).throw("Oh no!")
    }, {
      actual: thrower,
      expected: "Oh no!",
      message: "function () { throw \"Nope!\" } must throw \"Oh no!\""
    })
  })
})
