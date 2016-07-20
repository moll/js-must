var AssertionError = require("./assertion_error")
var Thenable = require("./thenable")
var then = Thenable.prototype.then

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function matcher() {
    var must = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(must, matcher)
    return this.actual.then(raise, then.bind(must, fn, arguments))
  }
}

function raise() { throw new AssertionError("Resolved") }
