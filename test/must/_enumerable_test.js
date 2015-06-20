var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.fail : assert.pass
  var doesNotThrow = truthy ? assert.pass : assert.fail

  it("must "+pass+" if property is enumerable", function() {
    var obj = {love: true}
    doesNotThrow(function() { Must(obj).have[name]("love") })
  })

  it("must "+pass+" if inherited property is enumerable", function() {
    function Fn() {}
    Fn.prototype.love = 69
    doesNotThrow(function() { Must(new Fn()).have[name]("love") })
  })

  it("must "+fail+" if property is nonenumerable", function() {
    var obj = Object.create(Object.prototype, {
      love: {value: 69, enumerable: false},
    })
    throws(function() { Must(obj).have[name]("love") })
  })

  it("must "+fail+" if inherited property is nonenumerable", function() {
    function Fn() {}
    Fn.prototype = Object.create(Object.prototype, {
      love: {value: 69, enumerable: false},
    })
    throws(function() { Must(new Fn()).have[name]("love") })
  })

  it("must "+pass+" if function's property is enumerable", function() {
    function fn() {}
    fn.love = 69
    doesNotThrow(function() { Must(fn).have[name]("love") })
  })

  it("must "+fail+" if function's property is nonenumerable", function() {
    function fn() {}
    Object.defineProperty(fn, "love", {value: 69, enumerable: false})
    throws(function() { Must(fn).have[name]("love") })
  })

  afterEach(function() { delete String.prototype.life })

  it("must "+pass+" if String.prototype's property is enumerable",
    function() {
    /* eslint no-extend-native: 0 */
    String.prototype.life = 42
    doesNotThrow(function() { Must("Hello").have[name]("life") })
  })

  it("must "+fail+" if String.prototype's property is nonenumerable",
    function() {
    Object.defineProperty(String.prototype, "life", {
      value: 42, enumerable: false, configurable: true
    })
    throws(function() { Must("Hello").have[name]("life") })
  })

  afterEach(function() { delete Boolean.prototype.life })

  it("must "+pass+" if false's Boolean.prototype's property is enumerable",
    function() {
    Boolean.prototype.life = 42
    doesNotThrow(function() { Must(false).have[name]("life") })
  })

  it("must "+fail+" if false's Boolean.prototype's property is nonenumerable",
    function() {
    Object.defineProperty(Boolean.prototype, "life", {
      value: 42, enumerable: false, configurable: true
    })
    throws(function() { Must(false).have[name]("life") })
  })

  it("must fail if property does not exist", function() {
    assert.fail(function() { Must({}).have[name]("love") })
  })

  it("must pass if object has "+name+" property named \"propertyIsEnumerable\"",
    function() {
    var obj = Object.create(Object.prototype, {
      propertyIsEnumerable: {value: false, enumerable: truthy}
    })
    assert.pass(function() {
      Must(obj).have[name]("propertyIsEnumerable")
    })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).have[name]("love") })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).have[name]("love") })
  })

  var errObj = Object.create(Object.prototype, {
    life: {value: 42, enumerable: true},
    love: {value: 69, enumerable: false},
  })

  var errProp = truthy ? "love" : "life"

  require("./_assertion_error_test")(function() {
    Must(errObj).have[name](errProp)
  }, {
    actual: {life: 42},
    message: "{\"life\":42} must have "+name+" property \""+errProp+"\""
  })

  describe(".not", function() {
    var errProp = truthy ? "life" : "love"

    it("must invert the assertion", function() {
      assert.fail(function() { Must(errObj).not.have[name](errProp) })
    })
  })
}
