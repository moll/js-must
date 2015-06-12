var Assertions = require("./lib/assertions")
var AssertionError = require("./lib/assertion_error")
module.exports = Must

/**
 * The main class that wraps the asserted object and that you call matchers on.
 *
 * Most of the time you'll be using
 * [`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
 * occasionally you might want to assert `null`s or `undefined`s and in those
 * cases assigning `Must` to something like `expect` or `demand` works nicely.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 *
 * var expect = require("must")
 * expect(null).be.null()
 *
 * var demand = require("must")
 * demand(undefined).be.undefined()
 *
 * @class Must
 * @constructor
 * @param actual
 */
function Must(actual) {
  if (!(this instanceof Must)) return new Must(actual)
  this.actual = actual
}

Must.prototype = Object.create(Assertions, {
  constructor: {value: Must, writable: true, configurable: true}
})

Must.AssertionError = AssertionError
