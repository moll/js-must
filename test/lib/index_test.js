var assert = require("assert")
var stringify = require("../..").stringify

describe("Must.stringify", function() {
  it("must return undefined", function() {
    assert.strictEqual(stringify(undefined), "undefined")
  })

  it("must return null", function() {
    assert.strictEqual(stringify(null), "null")
  })

  describe("given Number", function() {
    it("must show 42 as 42", function() {
      assert.strictEqual(stringify(42), "42")
    })

    it("must show Infinity as Infinity", function() {
      assert.strictEqual(stringify(Infinity), "Infinity")
    })

    it("must show -Infinity as -Infinity", function() {
      assert.strictEqual(stringify(-Infinity), "-Infinity")
    })

    it("must show NaN as NaN", function() {
      assert.strictEqual(stringify(NaN), "NaN")
    })
  })

  describe("given Date", function() {
    it("must show ISO string representation", function() {
      var date = new Date(Date.UTC(1987, 5, 18, 2))
      assert.strictEqual(stringify(date), "1987-06-18T02:00:00.000Z")
    })
  })

  describe("given RegExp", function() {
    it("must show source with flags", function() {
      var regexp = /abc[de]./i
      assert.strictEqual(stringify(regexp), "/abc[de]./i")
    })
  })

  describe("given Function", function() {
    it("must show source", function() {
      function awesome() { return 42 }
      assert.strictEqual(stringify(awesome), "function awesome() { return 42 }")
    })
  })

  describe("given Object", function() {
    it("must show recursively", function() {
      var obj = {a: {cool: 42}}
      assert.strictEqual(stringify(obj), '{"a":{"cool":42}}')
    })

    it("must show inherited properties", function() {
      var obj = Object.create({a: 42})
      assert.strictEqual(stringify(obj), '{"a":42}')
    })

    it("must show circular objects as [Circular]", function() {
      var obj = {name: "John", likes: {sex: true}}
      obj.self = obj
      var str = '{"name":"John","likes":{"sex":true},"self":"[Circular]"}'
      assert.strictEqual(stringify(obj), str)
    })

    it("must show nested circular objects as [Circular]", function() {
      var obj = {name: "John", likes: {}}
      obj.likes.likes = obj.likes
      var str = '{"name":"John","likes":{"likes":"[Circular]"}}'
      assert.strictEqual(stringify(obj), str)
    })

    it("must show circular arrays as [Circular]", function() {
      var obj = [1, 2, 3]
      obj.push(obj)
      obj.push(5)
      assert.strictEqual(stringify(obj), '[1,2,3,"[Circular]",5]')
    })

    it("must show circular inherited objects as [Circular]", function() {
      var obj = Object.create({name: "John"})
      obj.self = obj
      var str = '{"self":"[Circular]","name":"John"}'
      assert.strictEqual(stringify(obj), str)
    })

    it("must include undefined values", function() {
      var obj = {name: "John", age: undefined}
      assert.strictEqual(stringify(obj), '{"name":"John","age":"[Undefined]"}')
    })
  })

  describe("given Error", function() {
    it("must stringify the message", function() {
      var err = new Error("Problem")
      assert.strictEqual(stringify(err), '{"message":"Problem"}')
    })

    it("must stringify other enumerable properties", function() {
      var err = new Error("Not Found")
      err.code = 404
      assert.strictEqual(stringify(err), '{"code":404,"message":"Not Found"}')
    })
  })
})
