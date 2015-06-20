var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, inheritable) {
  var pass = inheritable ? "pass" : "fail"
  var fail = inheritable ? "fail" : "pass"
  var throws = inheritable ? assert.fail : assert.pass
  var doesNotThrow = inheritable ? assert.pass : assert.fail

  it("must pass given an object with expected own keys", function() {
    assert.pass(function() { Must({a: 1, b: 2}).have[name](["a", "b"]) })
  })

  it("must pass given an object with zero keys", function() {
    assert.pass(function() { Must({}).have[name]([]) })
  })

  it("must fail given zero and non-zero number of keys", function() {
    assert.fail(function() { Must({}).have[name](["a"]) })
    assert.fail(function() { Must({a: 1}).have[name]([]) })
  })

  it("must fail given a different amount of keys", function() {
    assert.fail(function() { Must({a: 1}).have[name](["a", "b"]) })
    assert.fail(function() { Must({a: 1, b: 2}).have[name](["a"]) })
  })

  it("must not modify given array", function() {
    var keys = ["name", "age"]
    Must({name: "John", age: 13}).have[name](keys)
    assert.deepEqual(keys, ["name", "age"])
  })

  describe("given an inherited object", function() {
    it("must "+pass+" given an object with inherited expected keys",
      function() {
      var obj = Object.create({a: 1, b: 2})
      doesNotThrow(function() { Must(obj).have[name](["a", "b"]) })
    })

    it("must "+pass+" given an object with some expected keys inherited",
      function() {
      var obj = Object.create({a: 1}, {b: {value: 2, enumerable: true}})
      doesNotThrow(function() { Must(obj).have[name](["a", "b"]) })
    })

    it("must "+fail+" given an object with all expected keys as own",
      function() {
      var obj = Object.create({a: 1}, {b: {value: 2, enumerable: true}})
      throws(function() { Must(obj).have[name](["b"]) })
    })

    it("must "+fail+" given an object with zero own keys", function() {
      throws(function() { Must(Object.create({a: 1})).have[name]([]) })
    })

    it("must fail given a different amount of keys", function() {
      assert.fail(function() {
        Must(Object.create({a: 1})).have[name](["a", "b"])
      })
      assert.fail(function() {
        Must(Object.create({a: 1, b: 2})).have[name](["a"])
      })
    })
  })

  it("must pass if function has key", function() {
    function fn() {}
    fn.love = 69
    assert.pass(function() { Must(fn).have[name](["love"]) })
  })

  it("must "+pass+" if function has inherited key", function() {
    function fn() {}
    /* eslint no-proto: 0 */
    var obj = {love: {value: 1, enumerable: 1}}
    fn.__proto__ = Object.create(fn.__proto__, obj)
    doesNotThrow(function() { Must(fn).have[name](["love"]) })
  })

  afterEach(function() { delete Number.prototype.life })

  it("must "+pass+" if Number.prototype has inherited key", function() {
    /* eslint no-extend-native: 0 */
    Object.defineProperty(Number.prototype, "life", {
      value: 42, enumerable: true, configurable: true
    })
    doesNotThrow(function() { Must(42).have[name](["life"]) })
  })

  afterEach(function() { delete Boolean.prototype.life })

  it("must "+pass+" if false's Boolean.prototype has property", function() {
    /* eslint no-extend-native: 0 */
    Object.defineProperty(Boolean.prototype, "life", {
      value: 42, enumerable: true, configurable: true
    })
    doesNotThrow(function() { Must(false).have[name](["life"]) })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).have[name](["love"]) })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).have[name](["love"]) })
  })
}
