module.exports = AssertionError

/**
 * Error object thrown when an assertion fails.
 *
 * @class AssertionError
 * @constructor
 * @param message
 * @param [options]
 */
function AssertionError(msg, opts) {
  this.message = msg
  if (opts && "actual" in opts) this.actual = opts.actual
  if (opts && "expected" in opts) this.expected = opts.expected
  Error.captureStackTrace(this, opts && opts.caller || arguments.callee.caller)
}

AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {value: AssertionError, configurable: true, writable: true}
})

AssertionError.prototype.name = "AssertionError"
