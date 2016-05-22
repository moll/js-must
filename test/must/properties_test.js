var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.properties", function() {
  // Allow using new Number:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  it("must pass if object is superset of given properties", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "John", age: 42}
    assert.pass(function() { Must(obj).have.properties(props) })
  })

  it("must pass if object has all given properties", function() {
    var a = {name: "John", age: 42, sex: "male"}
    var b = {name: "John", age: 42, sex: "male"}
    assert.pass(function() { Must(a).have.properties(b) })
  })

  it("must pass if given no properties", function() {
    assert.pass(function() { Must({name: "John"}).have.properties({}) })
  })

  it("must pass if object has inherited propertes", function() {
    var obj = Object.create({name: "John"})
    obj.age = 42
    obj.sex = "male"
    var props = {name: "John", age: 42}
    assert.pass(function() { Must(obj).have.properties(props) })
  })

  it("must pass if given an object with an undefined property", function() {
    var obj = {name: "John", age: 42, sex: undefined}
    var props = {name: "John", sex: undefined}
    assert.pass(function() { Must(obj).have.properties(props) })
  })

  it("must fail if one property missing", function() {
    var obj = {name: "John", sex: "male"}
    var props = {name: "John", age: 42}
    assert.fail(function() { Must(obj).have.properties(props) })
  })

  // Catches whether the last property check overwrites all previous ones.
  it("must fail if only last given property set", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "Jake", sex: "male"}
    assert.fail(function() { Must(obj).have.properties(props) })
  })

  it("must fail if object has one with an equivalent value", function() {
    var obj = {name: "John", age: 42, sex: "male"}
    var props = {name: "John", age: new Number(42)}
    assert.fail(function() { Must(obj).have.properties(props) })
  })

  it("must fail if an undefined property missing", function() {
    var obj = {name: "John", age: 42}
    var props = {name: "John", sex: undefined}
    assert.fail(function() { Must(obj).have.properties(props) })
  })

  it("must fail if object empty", function() {
    var props = {name: "John", age: 42}
    assert.fail(function() { Must({}).have.properties(props) })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).have.properties({}) })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).have.properties({}) })
  })

  require("./_assertion_error_test")(function() {
    var obj = {name: "John", sex: "male"}
    var props = {name: "John", age: 42}
    Must(obj).have.properties(props)
  }, {
    actual: {name: "John", sex: "male"},
    expected: {name: "John", age: 42},
    diffable: true,
    message: "{\"name\":\"John\",\"sex\":\"male\"} must have properties {\"name\":\"John\",\"age\":42}"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      var obj = {name: "John", age: 42, sex: "male"}
      var props = {name: "John", age: 42}
      assert.fail(function() { Must(obj).not.have.properties(props) })
    })
  })
})
