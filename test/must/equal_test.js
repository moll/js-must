var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.equal", function() {
  // Allow using new Boolean:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  it("must pass given nulls", function() {
    assert.pass(function() { Must(null).be.equal(null) })
  })

  it("must pass given undefineds", function() {
    assert.pass(function() { Must(undefined).be.equal(undefined) })
  })

  it("must fail given null and undefined", function() {
    assert.fail(function() { Must(null).be.equal(undefined) })
  })

  it("must fail given undefined and null", function() {
    assert.fail(function() { Must(undefined).be.equal(null) })
  })

  describe("given Boolean", function() {
    function mustPassTrueEqual(bool) {
      it("must pass given "+bool+" primitives", function() {
        assert.pass(function() { Must(bool).be.equal(bool) })
      })

      it("must fail given "+bool+" primitive and object", function() {
        assert.fail(function() { Must(bool).be.equal(new Boolean(bool)) })
        assert.fail(function() { Must(new Boolean(bool)).be.equal(bool) })
      })

      it("must fail given "+bool+" primitive with "+!bool, function() {
        assert.fail(function() { Must(bool).be.equal(!bool) })
      })
    }

    mustPassTrueEqual(true)
    mustPassTrueEqual(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent primitives", function() {
      assert.pass(function() { Must(42).be.equal(42) })
    })

    it("must fail given unequivalent primitives", function() {
      assert.fail(function() { Must(42).be.equal(1337) })
    })

    it("must fail given equivalent primitive and object", function() {
      assert.fail(function() { Must(42).be.equal(new Number(42)) })
      assert.fail(function() { Must(new Number(42)).be.equal(42) })
    })

    it("must fail given string", function() {
      assert.fail(function() { Must(42).be.equal("42") })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent primitives", function() {
      assert.pass(function() { Must("ok").be.equal("ok") })
    })

    it("must fail given unequivalent primitives", function() {
      assert.fail(function() { Must("ok").be.equal("nok") })
    })

    it("must fail given equivalent primitive and object", function() {
      assert.fail(function() { Must("ok").be.equal(new String("ok")) })
      assert.fail(function() { Must(new String("ok")).be.equal("ok") })
    })

    it("must fail given number", function() {
      assert.fail(function() { Must("42").be.equal(42) })
    })
  })

  describe("given RegExp", function() {
    it("must fail given equivalent regexps", function() {
      assert.fail(function() { Must(/a/).be.equal(/a/) })
    })

    it("must fail given unequivalent regexps", function() {
      assert.fail(function() { Must(/a/).be.equal(/b/) })
    })

    it("must pass given identical regexps", function() {
      var regexp = new RegExp
      assert.pass(function() { Must(regexp).be.equal(regexp) })
    })

    it("must fail given equivalent regexps", function() {
      assert.fail(function() { Must(new RegExp).be.equal(new RegExp) })
    })
  })

  describe("given Date", function() {
    it("must pass given identical dates", function() {
      var now = new Date
      assert.pass(function() { Must(now).be.equal(now) })
    })

    it("must fail given equivalent dates", function() {
      assert.fail(function() { Must(new Date(42)).be.equal(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must fail given equivalent arrays", function() {
      assert.fail(function() { Must([1]).be.equal([1]) })
    })

    it("must pass given identical arrays", function() {
      var array = []
      assert.pass(function() { Must(array).be.equal(array) })
    })

    it("must fail given unidentical arrays", function() {
      assert.fail(function() { Must([]).be.equal([]) })
    })
  })

  describe("given Function", function() {
    it("must pass given identical functions", function() {
      function fn() {}
      assert.pass(function() { Must(fn).be.equal(fn) })
    })

    it("must fail given equivalent functions", function() {
      assert.fail(function() {
        Must(function foo() {}).be.equal(function foo() {})
      })
    })
  })

  require("./_assertion_error_test")(function() { Must("secret").equal(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must equal 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("secret").not.equal("secret") })
    })
  })
})
