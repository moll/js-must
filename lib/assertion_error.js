exports = module.exports = function AssertionError(msg, opts) {
  this.message = msg
  if (opts && "actual" in opts) this.actual = opts.actual
  if (opts && "expected" in opts) this.expected = opts.expected
  Error.captureStackTrace(this, opts && opts.caller || arguments.callee.caller)
}

/**
 * Error object thrown when an assertion fails.
 *
 * @class AssertionError
 * @constructor
 */
exports.prototype = Object.create(Error.prototype, {
  constructor: {
    value: exports,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

exports.prototype.name = "AssertionError"
