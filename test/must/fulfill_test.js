var Promise = global.Promise || require("promise")
var Must = require("../..")
var failingPromiseTests = require("./_failing_promise_tests")
var assert = require("./assert")
var stringify = require("../../lib").stringify

describe("Must.prototype.fulfill", function() {
  failingPromiseTests(function(must) { must.fulfill() })

  it("must pass given a Promise that rejects, and eventually fail", function(done) {
    assert.pass(function() { Must(Promise.reject(new Error())).fulfill().then(raise(done),assertThrown(done)) })
  })

  it(
    "must pass given a Promise that resolves, and eventually pass, and resolve itself",
    function(done) {
      assert.pass(function() { Must(Promise.resolve(42)).fulfill().then(assertStrictEqual(done, 42), raise(done)) })
    }
  )

  it(
    "must pass given a Promise that resolves and a fulfilledCondition that returns, " +
    "and eventually pass, and resolve to the result of the fulfilledCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.resolve(42)).fulfill(function(result) {
          called = true
          result.must.be.a.number()
          result.must.be.truthy()
          return result // the resulting promise will be fulfilled
        })
        .then(assertStrictEqual(done, 42, function() { return called }), raise(done))
      })
    }
  )

  it(
    "must pass given a Promise that resolves and a fulfilledCondition that throws, " +
    "and eventually pass, and reject to the rejection of the fulfilledCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.resolve(42)).fulfill(function(result) {
          called = true
          result.must.be.a.number()
          result.must.be.truthy()
          throw result // the resulting promise will be rejected
        })
        .then(raise(done), assertStrictEqual(done, 42, function() { return called }))
      })
    }
  )

  it(
    "must pass given a Promise that resolves and a fulfilledCondition that fails, and eventually fail",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.resolve(42)).fulfill(function(result) {
          called = true
          result.must.not.be.a.number() // fails
          result.must.be.truthy()
          return result
        })
        .then(raise(done), assertThrown(done, function() { return called }))
      })
    }
  )

  it(
    "must pass given a Promise that rejects, and eventually fail, without calling the fulfilledCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.reject(new Error('rejection'))).fulfill(function() { // fulfill fails, callback is not executed
          called = true
        })
        .then(raise(done), assertThrown(done, function() { return !called }))
      })
    }
  )

  it("AssertionError must have all properties when it fails because of a rejection", function(done) {
    var message = "rejection message"
    var subject = Promise.reject(new Error(message))
    Must(subject).fulfill().then(
      raise(done),
      function(err) {
        try {
          assert(err instanceof Must.AssertionError)
          assert.deepEqual(
            err,
            {
              actual: subject,
              message: stringify(subject) + " must resolve, but got rejected with \'" + message + "\'"
            }
          )
          done()
        } catch (assertErr) {
          done(assertErr)
        }
      }
    )
  })

})

function assertStrictEqual(done, expected, called) {
  return function(value) {
    if (called) {
      assert(called())
    }
    assert.strictEqual(value, expected)
    done()
  }
}
function assertThrown(done, called) {
  return function(err) {
    if (called) {
      assert(called())
    }
    if (err instanceof Must.AssertionError) {
      done()
    }
    else {
      done(new Error("not a Must.AssertionError: " + err.message))
    }
  }
}
function raise(done) {
  return function() { done(new Error("Must fail")) }
}
