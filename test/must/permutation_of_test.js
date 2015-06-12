var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.permutationOf", function() {
  it("must pass if given array has same members", function() {
    assert.pass(function() { Must([1, 2, 3]).be.a.permutationOf([3, 2, 1]) })
  })

  it("must fail if given array does not have same members", function() {
    assert.fail(function() { Must([1, 2, 3]).be.a.permutationOf([1]) })
  })

  it("must fail if given array is missing duplicated members", function() {
    assert.fail(function() { Must([1, 2]).be.a.permutationOf([2, 1, 1]) })
  })

  it("must fail if given array has extra duplicated members", function() {
    assert.fail(function() { Must([1, 1, 2]).be.a.permutationOf([2, 1]) })
  })

  it("must pass if given array has same duplicated members", function() {
    assert.pass(function() { Must([1, 1, 2]).be.a.permutationOf([2, 1, 1]) })
  })

  it("must pass if both arrays empty", function() {
    assert.pass(function() { Must([]).be.a.permutationOf([]) })
  })

  it("must fail if given array has member of different type", function() {
    assert.fail(function() { Must([1]).be.a.permutationOf(["1"]) })
  })

  require("./_assertion_error_test")(function() {
    Must([1, 2, 3]).be.a.permutationOf([1, 2])
  }, {
    actual: [1, 2, 3],
    expected: [1, 2],
    diffable: true,
    message: "[1,2,3] must be a permutation of [1,2]"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() {
        Must([1, 2, 3]).not.be.a.permutationOf([1, 2, 3])
      })
    })
  })
})
