var Promise = global.Promise || require("promise")
var Must = require("../..")
var failingPromiseTests = require("./_failing_promise_tests")
var assert = require("./assert")

describe("Must.prototype.promise", function() {
  failingPromiseTests(function(must) { must.promise() })

  it("must pass given an object with a catch and a then function", function () {
    assert.pass(function () { Must(failingPromiseTests.catchAndThen).be.promise() })
  })

  it("must pass given a Promise implementation, with a resolved promise", function () {
    assert.pass(function () { Must(Promise.resolve(42)).be.promise() })
  })

  it("must pass given a Promise implementation, with a rejected promise (and passes it through)", function(done) {
    var p = Promise.reject(new Error())
    assert.pass(function() { Must(p).be.promise() })
    p.catch(function() { done() }) // deal with UnhandledPromiseRejectionWarning
  })

  it("passes through a resolved promise", function() {
    var p = Promise.resolve(42)
    assert(Must(p).be.promise() === p)
  })

  it("passes through a rejected promise", function(done) {
    var rejection = new Error()
    var p = Promise.reject(rejection)
    var outcome = Must(p).be.promise()
    assert(outcome === p)
    p.catch(function(err) { // deal with UnhandledPromiseRejectionWarning
      assert(err === rejection)
      done()
    })
  })
})
