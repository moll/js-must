var Thenable = require("./thenable")

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function() {
    var self = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(self, arguments.callee)
    return this.actual.then(Thenable.prototype.then.bind(self, fn, arguments))
  }
}
