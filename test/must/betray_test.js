var Promise = global.Promise || require("promise")
var Must = require("../..")
var failingPromiseTests = require("./_failing_promise_tests")
var assert = require("./assert")
var stringify = require("../../lib").stringify

describe("Must.prototype.betray", function() {
  failingPromiseTests(function(must) { must.betray() })

  it(
    "must pass given a Promise that rejects, and eventually pass, and reject itself",
    function(done) {
      var rejection = new Error()
      assert.pass(
        function() { Must(Promise.reject(rejection)).betray().then(raise(done), assertStrictEqual(done, rejection)) }
      )
    }
  )

  it("must pass given a Promise that resolves, and eventually fail", function(done) {
    assert.pass(function() { Must(Promise.resolve(42)).betray().then(raise(done), assertThrown(done)) })
  })

  it(
    "must pass given a Promise that rejects and a catchCondition that returns, " +
    "and eventually pass, and resolve to the result of the catchCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.reject(42)).betray(function(result) {
          called = true
          result.must.be.a.number()
          result.must.be.truthy()
          return result // the resulting promise will be fulfilled
        }).then(assertStrictEqual(done, 42, function() { return called }), raise(done))
      })
    }
  )

  it(
    "must pass given a Promise that rejects and a catchCondition that throws, " +
    "and eventually pass, and reject to the rejection of the catchCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.reject(42)).betray(function(err) {
          called = true
          err.must.be.a.number()
          err.must.be.truthy()
          throw err // the resulting promise will be rejected
        })
        .then(raise(done), assertStrictEqual(done, 42, function() { return called }))
      })
    }
  )

  it(
    "must pass given a Promise that rejects and a catchCondition that fails, and eventually fail",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.reject(42)).betray(function(result) {
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
    "must pass given a Promise that resolves, and eventually fail, without calling the catchCondition",
    function(done) {
      var called = false
      assert.pass(function() {
        Must(Promise.resolve(42)).betray(function() { // betray fails, callback is not executed
          called = true
        })
        .then(raise(done), assertThrown(done, function() { return !called }))
      })
    }
  )

  it("AssertionError must have all properties when it fails because of a resolution", function(done) {
    var resolution = 42
    var subject = Promise.resolve(resolution)
    Must(subject).betray().then(
      raise(done),
      function(err) {
        try {
          assert(err instanceof Must.AssertionError)
          assert.deepEqual(
            err,
            {
              actual: subject,
              message: "{} must reject, but got fulfilled with \'" + stringify(resolution) + "\'"
            }
          )
          done()
        }
        catch (assertErr) {
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
