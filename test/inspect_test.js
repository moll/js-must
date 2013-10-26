var inspect = require("../lib/inspect")
var assert = require("assert")

describe("inspect", function() {
  it("must return undefined", function() {
    assert.strictEqual(inspect(undefined), "undefined")
  })

  it("must return null", function() {
    assert.strictEqual(inspect(null), "null")
  })

  describe("given Date", function() {
    it("must show ISO string representation", function() {
      var date = new Date(1987, 5, 18, 2)
      assert.strictEqual(inspect(date), "1987-06-17T23:00:00.000Z")
    })
  })

  describe("given RegExp", function() {
    it("must show source with flags", function() {
      var regexp = /abc[de]./i
      assert.strictEqual(inspect(regexp), "/abc[de]./i")
    })
  })

  describe("given Function", function() {
    it("must show source", function() {
      function awesome() { return 42 }
      assert.strictEqual(inspect(awesome), "function awesome() { return 42 }")
    })
  })

  describe("given Object", function() {
    it("must show recursively", function() {
      var obj = {a: {cool: 42}}
      assert.strictEqual(inspect(obj), '{"a":{"cool":42}}')
    })

    it("must show circular objects as [Circular]", function() {
      var obj = {name: "John", likes: {sex: true}}
      obj.self = obj
      var str = '{"name":"John","likes":{"sex":true},"self":"[Circular]"}'
      assert.strictEqual(inspect(obj), str)
    })

    it("must show circular arrays as [Circular]", function() {
      var obj = [1, 2, 3]
      obj.push(obj)
      obj.push(5)
      assert.strictEqual(inspect(obj), '[1,2,3,"[Circular]",5]')
    })

    it("must include undefined values", function() {
      var obj = {name: "John", age: undefined}
      assert.strictEqual(inspect(obj), '{"name":"John","age":"[Undefined]"}')
    })
  })
})
