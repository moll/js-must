var AssertionError = require("./assertion_error")
var Thenable = require("./thenable")
var then = Thenable.prototype.then

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function() {
    var self = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(self, arguments.callee)
    return this.actual.then(raise, then.bind(self, fn, arguments))
  }
}

function raise() { throw new AssertionError("Resolved") }
