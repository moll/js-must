var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, inheritable) {
  // Allow using new Number:
  /* jshint -W053 */
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

    require("./_assertion_error_test")(function() { Must({}).have[name]("love") }, {
      actual: {},
      message: "{} must have "+errName+" \"love\""
    })

    describe(".not", function() {
      function not() { Must({love: 69}).not.have[name]("love") }

      it("must invert the assertion", function() {
        assert.fail(not)
      })

      require("./_assertion_error_test")(not, {
        actual: {love: 69},
        message: "{\"love\":69} must not have "+errName+" \"love\""
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

    require("./_assertion_error_test")(function() { Must({}).have[name]("love", 69) }, {
      actual: {},
      message: "{} must have "+errName+" \"love\" equal to 69"
    })

    describe(".not", function() {
      function not() { Must({love: 69}).not.have[name]("love", 69) }

      it("must invert the assertion", function() {
        assert.fail(not)
      })

      require("./_assertion_error_test")(not, {
        actual: {love: 69},
        message: "{\"love\":69} must not have "+errName+" \"love\" equal to 69"
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
    fn.__proto__ = Object.create(fn.__proto__, {love: {value: 69}})
    doesNotThrow(function() { Must(fn).have[name]("love") })
  })

  afterEach(function() { delete String.prototype.life })

  it("must "+pass+" if String.prototype has property", function() {
    Object.defineProperty(String.prototype, "life", {
      value: 42, enumerable: false, configurable: true
    })
    doesNotThrow(function() { Must("Hello").have[name]("life") })
  })

  afterEach(function() { delete Boolean.prototype.life })

  it("must "+pass+" if false's Boolean.prototype has property", function() {
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
