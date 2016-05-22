var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, inheritable) {
  // Allow using new Number:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */
  var pass = inheritable ? "pass" : "fail"
  var doesNotThrow = inheritable ? assert.pass : assert.fail
  var errName = name.replace(/[A-Z]/, function(l) {return " "+l.toLowerCase()})

  it("must pass if object is superset of given properties", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "John", age: 42}
    assert.pass(function() { Must(obj).have[name](props) })
  })

  it("must pass if object has all given properties", function() {
    var a = {name: "John", age: 42, sex: "male"}
    var b = {name: "John", age: 42, sex: "male"}
    assert.pass(function() { Must(a).have[name](b) })
  })

  it("must pass if given no properties", function() {
    assert.pass(function() { Must({name: "John"}).have[name]({}) })
  })

  it("must "+pass+" if object has inherited propertes", function() {
    var obj = Object.create({name: "John"})
    obj.age = 42
    obj.sex = "male"
    var props = {name: "John", age: 42}
    doesNotThrow(function() { Must(obj).have[name](props) })
  })

  it("must pass if given an object with an undefined property", function() {
    var obj = {name: "John", age: 42, sex: undefined}
    var props = {name: "John", sex: undefined}
    assert.pass(function() { Must(obj).have[name](props) })
  })

  it("must "+pass+" if object has inherited property as undefined", function() {
    var obj = Object.create({name: "John", age: undefined})
    obj.sex = "male"
    var props = {age: undefined, sex: "male"}
    doesNotThrow(function() { Must(obj).have[name](props) })
  })

  it("must fail if one property missing", function() {
    var obj = {name: "John", sex: "male"}
    var props = {name: "John", age: 42}
    assert.fail(function() { Must(obj).have[name](props) })
  })

  // Catches whether the last property check overwrites all previous ones.
  it("must fail if only last given property set", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "Jake", sex: "male"}
    assert.fail(function() { Must(obj).have[name](props) })
  })

  it("must fail if object has one with an equivalent value", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "John", age: new Number(42)}
    assert.fail(function() { Must(obj).have[name](props) })
  })

  it("must fail if an undefined property missing", function() {
    var obj = {name: "John", age: 42}
    var props = {name: "John", sex: undefined}
    assert.fail(function() { Must(obj).have[name](props) })
  })

  it("must fail if object empty", function() {
    var props = {name: "John", age: 42}
    assert.fail(function() { Must({}).have[name](props) })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).have[name]({}) })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).have[name]({}) })
  })

  require("./_assertion_error_test")(function() {
    var obj = {name: "John", sex: "male"}
    var props = {name: "John", age: 42}
    Must(obj).have[name](props)
  }, {
    actual: {name: "John", sex: "male"},
    expected: {name: "John", age: 42},
    diffable: true,
    message: "{\"name\":\"John\",\"sex\":\"male\"} must have "+errName+" {\"name\":\"John\",\"age\":42}"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      var obj = {name: "John", age: 42, sex: "male"}
      var props = {name: "John", age: 42}
      assert.fail(function() { Must(obj).not.have[name](props) })
    })
  })
}
