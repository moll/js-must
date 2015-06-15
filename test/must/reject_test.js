var Promise = global.Promise || require("promise")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.reject", function() {
  it("must return a promise from a matcher", function() {
    var promise = Must(Promise.resolve(42)).reject.number()
    assert.strictEqual(typeof promise.then, "function")
  })

  it("must resolve given a rejected promise with expected value", function() {
    return Must(Promise.reject(42)).reject.equal(42)
  })

  it("must reject given a resolved promise", function() {
    return Must(Promise.resolve(42)).reject.equal(42).then(raise, assertThrown)
  })

  it("must not change existing instance before resolving", function() {
    var must = Must(Promise.reject(42))
    must.reject.equal(42)
    assert.fail(function() { must.equal(42) })
  })

  it("must not change existing instance after resolving", function() {
    var must = Must(Promise.reject(42))
    var promise = must.reject.equal(42)
    return promise.then(function() { must.be.an.instanceof(Promise) })
  })

  describe("AssertionError", function() {
    function test() { return Must(Promise.reject(13)).reject.equal(42) }

    it("must be rejected", function() {
      return test().then(raise, assertThrown)
    })

    it("must have all properties", function() {
      return test().then(raise, function(err) {
        assert.deepEqual(err, {
          actual: 13,
          expected: 42,
          message: "13 must equal 42"
        })
      })
    })

    it("must have correct stack trace", function() {
      return test().then(raise, function(err) {
        var stack = err.stack.split(/\r?\n/)
        assert(stack[0].match(/AssertionError/, "must include AssertionError"))
        assert(stack[1].match(/[\\\/]test[\\\/]/), "must have test at top")
      })
    })
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      var promise = Must(Promise.reject(42)).reject.not.equal(42)
      return promise.then(raise, assertThrown)
    })
  })
})

function assertThrown(err) { assert(err instanceof Must.AssertionError) }
function raise() { throw new Error("Must fail") }
