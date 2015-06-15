var _ = require("lodash")
var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, actualize) {
  var create = _.compose(Must, actualize)

  describe("as an error matcher", function() {
    describe("given String", function() {
      it("must pass given error with identical message", function() {
        assert.pass(function() { create(new Error("Oh no!"))[name]("Oh no!") })
      })

      it("must fail given error with part of identical message",
        function() {
        assert.fail(function() { create(new Error("Oh no!"))[name]("Oh no") })
      })

      it("must fail given error with unequivalent message", function() {
        assert.fail(function() { create(new Error("Oh no!"))[name]("Oh yes!") })
      })
    })

    describe("given RegExp", function() {
      it("must pass given error with matching message", function() {
        assert.pass(function() { create(new Error("Oh no!"))[name](/no!/) })
      })

      it("must fail given error with unmatching message", function() {
        assert.fail(function() { create(new Error("Oh no!"))[name](/yes!/) })
      })
    })

    describe("given Function", function() {
      // Intentionally do not subclass FakeError from Error.
      function FakeError(msg) { this.message = msg == null ? "" : msg }
      FakeError.prototype.message = ""

      it("must pass given error instance of function", function() {
        assert.pass(function() { create(new FakeError)[name](FakeError) })
      })

      it("must pass given error child instance of function", function() {
        assert.pass(function() { create(new TypeError)[name](Error) })
      })

      it("must fail given error instance of other function", function() {
        assert.fail(function() { create(new Error)[name](FakeError) })
      })

      it("must fail given error parent instance of function", function() {
        assert.fail(function() { create(new Error)[name](TypeError) })
      })

      describe("with String", function() {
        var err = new TypeError("Oh no!")

        it("must pass given error with identical message", function() {
          assert.pass(function() { create(err)[name](TypeError, "Oh no!") })
        })

        it("must fail given error other instance", function() {
          assert.fail(function() { create(err)[name](RangeError, "Oh no!") })
        })

        it("must fail given error with part of identical message",
          function() {
          assert.fail(function() { create(err)[name](TypeError, "Oh no") })
        })

        it("must fail given error with unequivalent message", function() {
          assert.fail(function() { create(err)[name](TypeError, "Oh yes!") })
        })
      })

      describe("with RegExp", function() {
        var err = new TypeError("Oh no!")

        it("must pass given error with matching message", function() {
          assert.pass(function() { create(err)[name](TypeError, /no!/) })
        })

        it("must fail given error other instance", function() {
          assert.fail(function() { create(err)[name](RangeError, /no!/) })
        })

        it("must fail given error with unmatching message", function() {
          assert.fail(function() { create(err)[name](TypeError, /yes!/) })
        })
      })
    })
  })
}
