var wrap = require("lodash.wrap")
var lookupGetter = require("oolong").lookupGetter
var slice = Function.call.bind(Array.prototype.slice)

exports = module.exports = function(must) {
  must = Object.create(must)

  for (var name in must)
    if (hasFunction(must, name)) must[name] = promisify(must[name])

  Object.defineProperty(must, "assert", {
    value: wrap(must.assert, exports.prototype.assert),
    configurable: true, writable: true
  })

  return must
}

exports.prototype.assert = function assert(orig, ok, msg, opts) {
  opts = opts ? Object.create(opts) : {}
  if ("stack" in this) opts.stack = this.stack
  orig.apply(this, slice(arguments, 1))
}

exports.prototype.apply = function(fn, args, actual) {
  this.actual = actual
  fn.apply(this, args)
}

function hasFunction(obj, name) {
  return !lookupGetter(obj, name) && typeof obj[name] == "function"
}

function promisify(fn) {
  return function() {
    var self = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(self, arguments.callee)
    return this.actual.then(exports.prototype.apply.bind(self, fn, arguments))
  }
}
