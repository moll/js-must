var Thenable = require("./thenable")

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function matcher() {
    var must = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(must, matcher)
    return this.actual.then(Thenable.prototype.then.bind(must, fn, arguments))
  }
}
