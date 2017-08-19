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

  it("must pass given a Promise implementation, with a rejected promise", function () {
    assert.pass(function () { Must(Promise.reject(new Error())).be.promise() })
  })
})
