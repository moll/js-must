var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, inheritable) {
  // Allow using new Number:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */
  var pass = inheritable ? "pass" : "fail"
  var doesNotThrow = inheritable ? assert.pass : assert.fail
  var errName = name.replace(/[A-Z]/, function(l) {return " "+l.toLowerCase()})

  describe("given name", function() {
    it("must pass if object has property", function() {
      assert.pass(function() { Must({love: 69}).have[name]("love") })
    })

    it("must "+pass+" if object has inherited property", function() {
      var obj = Object.create({love: 69})
      doesNotThrow(function() { Must(obj).have[name]("love") })
    })

    it("must fail if object doesn't have property", function() {
      assert.fail(function() { Must({}).have[name]("love") })
    })

    it("must pass if object has property as undefined", function() {
      assert.pass(function() {
        Must({love: undefined}).have[name]("love")
      })
    })

    it("must "+pass+" if object has inherited property as undefined",
      function() {
      var obj = Object.create({love: undefined})
      doesNotThrow(function() { Must(obj).have[name]("love") })
    })

    require("./_assertion_error_test")(function() {
      Must({name: "John"}).have[name]("age")
    }, {
      actual: {name: "John"},
      message: "{\"name\":\"John\"} must have "+errName+" \"age\""
    })

    describe(".not", function() {
      it("must invert the assertion", function() {
        assert.fail(function() { Must({name: "John"}).not.have[name]("name") })
      })
    })
  })

  describe("given name and value", function() {
    it("must pass if object has property with identical value", function() {
      assert.pass(function() {
        Must({love: 69}).have[name]("love", 69)
      })
    })

    it("must "+pass+" if object has inherited property with identical value",
      function() {
      var obj = Object.create({love: 69})
      doesNotThrow(function() { Must(obj).have[name]("love", 69) })
    })

    it("must fail if object doesn't have property", function() {
      assert.fail(function() { Must({}).have[name]("love", 69) })
    })

    it("must fail if object has property with equivalent value", function() {
      assert.fail(function() {
        Must({love: 69}).have[name]("love", new Number(69))
      })
    })

    it("must pass if object has property asserted undefined", function() {
      assert.pass(function() {
        Must({love: undefined}).have[name]("love", undefined)
      })
    })

    it("must "+pass+" if object has inherited property asserted undefined",
      function() {
      var obj = Object.create({love: undefined})
      doesNotThrow(function() { Must(obj).have[name]("love", undefined) })
    })

    require("./_assertion_error_test")(function() {
      Must({age: 13}).have[name]("age", 42)
    }, {
      actual: {age: 13},
      expected: 42,
      message: "{\"age\":13} must have "+errName+" \"age\" equal to 42"
    })

    describe(".not", function() {
      it("must invert the assertion", function() {
        assert.fail(function() { Must({age: 42}).not.have[name]("age", 42) })
      })
    })
  })

  it("must pass if function has property", function() {
    function fn() {}
    fn.love = 69
    assert.pass(function() { Must(fn).have[name]("love") })
  })

  it("must "+pass+" if function has inherited property", function() {
    function fn() {}
    /* eslint no-proto: 0 */
    fn.__proto__ = Object.create(fn.__proto__, {love: {value: 69}})
    doesNotThrow(function() { Must(fn).have[name]("love") })
  })

  afterEach(function() { delete String.prototype.life })

  it("must "+pass+" if String.prototype has property", function() {
    /* eslint no-extend-native: 0 */
    Object.defineProperty(String.prototype, "life", {
      value: 42, enumerable: false, configurable: true
    })
    doesNotThrow(function() { Must("Hello").have[name]("life") })
  })

  afterEach(function() { delete Boolean.prototype.life })

  it("must "+pass+" if false's Boolean.prototype has property", function() {
    /* eslint no-extend-native: 0 */
    Object.defineProperty(Boolean.prototype, "life", {
      value: 42, enumerable: false, configurable: true
    })
    doesNotThrow(function() { Must(false).have[name]("life") })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).have[name]("love") })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).have[name]("love") })
  })
}
