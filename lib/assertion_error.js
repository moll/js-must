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

  /**
   * The asserted object.
   *
   * @property actual
   */
  if (opts && "actual" in opts) this.actual = opts.actual

  /**
   * If the matcher took an argument or asserted against something (like
   * `foo.must.be.true()`), then this is the expected value.
   *
   * @property expected
   */
  if (opts && "expected" in opts) this.expected = opts.expected

  /**
   * The stack trace starting from the code that called `must`.
   *
   * @property stack
   */
  Error.captureStackTrace(this, opts && opts.caller || arguments.callee.caller)
}

AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {value: AssertionError, configurable: true, writable: true}
})

AssertionError.prototype.name = "AssertionError"
