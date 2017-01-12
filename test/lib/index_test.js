var assert = require("assert")
var stringify = require("../..").stringify
var describeSymbol = typeof Symbol != "undefined" ? describe : xdescribe
var itSymbol = typeof Symbol != "undefined" ? it : xit
var INDENT = null

describe("Must.stringify", function() {
  it("must return undefined", function() {
    assert.strictEqual(stringify(undefined), "undefined")
  })

  it("must return null", function() {
    assert.strictEqual(stringify(null), "null")
  })

  describe("given Number", function() {
    it("must stringify 42 as 42", function() {
      assert.strictEqual(stringify(42), "42")
    })

    it("must stringify Infinity as Infinity", function() {
      assert.strictEqual(stringify(Infinity), "Infinity")
    })

    it("must stringify -Infinity as -Infinity", function() {
      assert.strictEqual(stringify(-Infinity), "-Infinity")
    })

    it("must stringify NaN as NaN", function() {
      assert.strictEqual(stringify(NaN), "NaN")
    })
  })

  describe("given String", function() {
    it("must stringify quoted", function() {
      assert.strictEqual(stringify("Hello, world!"), "\"Hello, world!\"")
    })
  })

  describeSymbol("given Symbol", function() {
    it("must stringify a named symbol", function() {
      var symbol = Symbol("iterator")
      assert.strictEqual(stringify(symbol), "Symbol(iterator)")
    })

    it("must stringify an unnamed symbol", function() {
      var symbol = Symbol()
      assert.strictEqual(stringify(symbol), "Symbol()")
    })
  })

  describe("given Date", function() {
    it("must stringify ISO string representation", function() {
      var date = new Date(Date.UTC(1987, 5, 18, 2))
      assert.strictEqual(stringify(date), "1987-06-18T02:00:00.000Z")
    })
  })

  describe("given RegExp", function() {
    it("must stringify source with flags", function() {
      var regexp = /abc[de]./i
      assert.strictEqual(stringify(regexp), "/abc[de]./i")
    })
  })

  describe("given Function", function() {
    it("must stringify source", function() {
      function awesome() { return 42 }
      assert.strictEqual(stringify(awesome), "function awesome() { return 42 }")
    })
  })

  describe("given Array", function() {
    it("must stringify recursively", function() {
      var array = [{cool: 42}]
      assert.strictEqual(stringify(array), jsonify(array))
    })

    it("must stringify circular objects", function() {
      var array = [{name: "John"}, {name: "Mark"}]
      array[0].self = array[0]

      assert.strictEqual(stringify(array), jsonify([
        {name: "John", self: "[Circular ~.0]"},
        {name: "Mark"}
      ]))
    })

    it("must stringify with toJSON", function() {
      var array = [{toJSON: function() { return 42 }}]
      assert.strictEqual(stringify(array), jsonify([42]))
    })
  })

  describe("given Object", function() {
    it("must stringify recursively", function() {
      var obj = {a: {cool: 42}}
      assert.strictEqual(stringify(obj), jsonify(obj))
    })

    it("must stringify inherited properties", function() {
      var obj = Object.create({a: 42})
      assert.strictEqual(stringify(obj), jsonify({a: 42}))
    })

    it("must stringify circular objects", function() {
      var obj = {name: "John", likes: {sex: true}}
      obj.self = obj

      assert.strictEqual(stringify(obj), jsonify({
        name: "John",
        likes: {sex: true},
        self: "[Circular ~]"
      }))
    })

    it("must stringify nested circular objects", function() {
      var obj = {name: "John", likes: {}}
      obj.likes.likes = obj.likes
      var str = jsonify({name: "John", likes: {likes: "[Circular ~.likes]"}})
      assert.strictEqual(stringify(obj), str)
    })

    it("must stringify circular arrays", function() {
      var obj = [1, 2, 3]
      obj.push(obj)
      obj.push(5)
      assert.strictEqual(stringify(obj), jsonify([1, 2, 3, "[Circular ~]", 5]))
    })

    it("must stringify circular inherited objects", function() {
      var obj = Object.create({name: "John"})
      obj.self = obj
      var str = jsonify({self: "[Circular ~]", name: "John"})
      assert.strictEqual(stringify(obj), str)
    })

    it("must stringify undefined values", function() {
      var obj = {name: "John", age: undefined}
      var str = jsonify({name: "John", age: "[Undefined]"})
      assert.strictEqual(stringify(obj), str)
    })

    it("must stringify NaN", function() {
      var obj = {age: NaN}
      var str = jsonify({age: "[NaN]"})
      assert.strictEqual(stringify(obj), str)
    })

    it("must stringify with toJSON", function() {
      var obj = {age: {toJSON: function() { return 42 }}}
      assert.strictEqual(stringify(obj), jsonify({age: 42}))
    })

    itSymbol("must stringify nested Symbol", function() {
      var obj = {name: "John", type: Symbol("person")}
      var str = jsonify({name: "John", type: "Symbol(person)"})
      assert.strictEqual(stringify(obj), str)
    })

    it("must stringify nested RegExp", function() {
      var obj = {name: "John", match: /tinder/i}
      var str = jsonify({name: "John", match: "/tinder/i"})
      assert.strictEqual(stringify(obj), str)
    })

    it("must not stringify nested Function", function() {
      var obj = {name: "John", greet: function() {}}
      assert.strictEqual(stringify(obj), jsonify({name: "John"}))
    })
  })

  describe("given Error", function() {
    it("must stringify the message", function() {
      var err = new Error("Problem")
      assert.strictEqual(stringify(err), jsonify({message: "Problem"}))
    })

    it("must stringify other enumerable properties", function() {
      var err = new Error("Not Found")
      err.code = 404
      var str = jsonify({code: 404, message: "Not Found"})
      assert.strictEqual(stringify(err), str)
    })
  })
})

function jsonify(obj) { return JSON.stringify(obj, null, INDENT) }
