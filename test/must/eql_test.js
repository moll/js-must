var _ = require("lodash")
var O = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.eql", function() {
  // Allow using new Boolean, String, Number:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */
  function eql(a, b) { Must(a).be.eql(b) }

  testNull(eql)
  testBoolean(eql)
  testNumber(eql)
  testString(eql)
  testSymbol(eql)
  testRegExp(eql)
  testDate(eql)
  testFunction(eql)

  it("must fail given an empty array and empty object", function() {
    // Can't think of an assertion library that would be nuts enough to consider
    // {} equivalent to []. Oh yeah, I can! For fucks sake, this is reason #42
    // why Must.js is better!
    assert.fail(function() { Must({}).be.eql([]) })
    assert.fail(function() { Must([]).be.eql({}) })
  })

  describe("given Array", function() {
    it("must pass given equivalent empty arrays", function() {
      assert.pass(function() { Must([]).be.eql([]) })
    })

    it("must pass given empty array and Array.prototype", function() {
      assert.pass(function() { Must([]).be.eql(Array.prototype) })
    })

    it("must pass given equivalent arrays", function() {
      assert.pass(function() { Must([1]).be.eql([1]) })
    })

    it("must pass given identical arrays", function() {
      var array = []
      assert.pass(function() { Must(array).be.eql(array) })
    })

    it("must fail given an empty and non-empty array", function() {
      assert.fail(function() { Must([]).be.eql([1]) })
      assert.fail(function() { Must([1]).be.eql([]) })
    })

    it("must fail given a smaller and a larger array", function() {
      assert.fail(function() { Must([1]).be.eql([1, 2]) })
      assert.fail(function() { Must([1, 2]).be.eql([1]) })
    })

    it("must pass given equivalent nested arrays", function() {
      assert.pass(function() { Must([1, [2], 3]).be.eql([1, [2], 3]) })
    })

    it("must fail given unequivalent nested arrays", function() {
      assert.fail(function() { Must([1, [2], 3]).be.eql([1, [42], 3]) })
    })

    describe("with circular references", function() {
      it("must pass if equivalent", function() {
        var a = [1, 2, 3]
        a.push(a)
        a.push(5)
        var b = [1, 2, 3]
        b.push(b)
        b.push(5)

        assert.pass(function() { Must(a).be.eql(b) })
      })

      it("must fail if only one circular", function() {
        var a = [1, 2, 3]
        a.push(a)
        a.push(5)
        var b = [1, 2, 3, [1, 2, 3, 5], 5]
        assert.fail(function() { Must(a).be.eql(b) })
        assert.fail(function() { Must(b).be.eql(a) })
      })

      it("must fail if circular to different levels", function() {
        var a = [1, 2, 3]
        a.push(a)

        var b = [1, 2, 3]
        var bInside = [1, 2, 3]
        bInside.push(bInside)
        b.push(bInside)

        assert.fail(function() { Must(a).be.eql(b) })
        assert.fail(function() { Must(b).be.eql(a) })
      })
    })

    describe("with nested values", function() {
      function nestedEql(a, b) { Must([a]).be.eql([b]) }

      testNull(nestedEql)
      testBoolean(nestedEql)
      testNumber(nestedEql)
      testString(nestedEql)
      testSymbol(nestedEql)
      testRegExp(nestedEql)
      testDate(nestedEql)
      testFunction(nestedEql)
    })
  })

  describe("given Object", function() {
    testObjectProperties(eql, _.identity)

    it("must pass given empty inherited objects", function() {
      var a = Object.create({})
      var b = Object.create({})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given empty ancestored objects", function() {
      var a = Object.create(Object.create({}))
      var b = Object.create(Object.create({}))
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given empty objects inherited from null", function() {
      var a = Object.create(null)
      var b = Object.create(null)
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given empty objects ancestored from null", function() {
      var a = Object.create(Object.create(null))
      var b = Object.create(Object.create(null))
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given equivalent inherited objects", function() {
      var a = Object.create({love: 42})
      var b = Object.create({love: 42})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given equivalent ancestored objects", function() {
      var a = Object.create(Object.create({love: 42}))
      var b = Object.create(Object.create({love: 42}))
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given equivalent objects inherited from null", function() {
      var a = Object.create(null, {life: {value: 42, enumerable: true}})
      var b = Object.create(null, {life: {value: 42, enumerable: true}})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given equivalent objects ancestored from null", function() {
      var a = Object.create(Object.create(null, {
        life: {value: 42, enumerable: true}
      }))
      var b = Object.create(Object.create(null, {
        life: {value: 42, enumerable: true}
      }))
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must fail given unequivalent inherited objects", function() {
      var a = Object.create({love: 42})
      var b = Object.create({love: 69})
      assert.fail(function() { Must(a).be.eql(b) })
    })

    it("must fail given unequivalent ancestored objects", function() {
      var a = Object.create(Object.create({love: 42}))
      var b = Object.create(Object.create({love: 69}))
      assert.fail(function() { Must(a).be.eql(b) })
    })

    it("must fail given unequivalent objects inherited from null",
      function() {
      var a = Object.create(null, {life: {value: 42, enumerable: true}})
      var b = Object.create(null, {life: {value: 69, enumerable: true}})
      assert.fail(function() { Must(a).be.eql(b) })
    })

    it("must fail given unequivalent objects ancestored from null",
      function() {
      var a = Object.create(Object.create(null, {
        life: {value: 42, enumerable: true}
      }))

      var b = Object.create(Object.create(null, {
        life: {value: 69, enumerable: true}
      }))

      assert.fail(function() { Must(a).be.eql(b) })
    })
  })

  describe("given Object with constructor", function() {
    function Attributes(attrs) { O.assign(this, attrs) }
    testObjectProperties(eql, function(attrs) { return new Attributes(attrs) })

    it("must pass given equivalent objects", function() {
      function Value(value) { this.value = value }
      var a = new Value(42); a.name = "Something"
      var b = new Value(42); b.name = "Something"
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given non-function valueOfs", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = 42
      var a = new Value(42)
      var b = new Value(42)
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given one with unenumerable valueOf", function() {
      function Value(value) { this.value = value }
      var a = new Value(42)

      var b = new Value(42)
      Object.defineProperty(b, "valueOf", {
        value: function() { return this.value }, configurable: 1, writable: 1
      })

      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must fail given unequivalent objects", function() {
      function Value(value) { this.value = value }
      var a = new Value(42); a.name = "Something"
      var b = new Value(42); b.name = "Other"
      assert.fail(function() { Must(a).be.eql(b) })
    })

    it("must fail given different constructors", function() {
      function A() {}
      function B() {}
      assert.fail(function() { Must(new A).eql(new B) })
    })

    it("must fail given instance and plain object", function() {
      function Model() {}
      var a = new Model, b = {}
      assert.fail(function() { Must(a).eql(b) })
      assert.fail(function() { Must(b).eql(a) })
    })

    it("must fail given subclassed constructor", function() {
      function Value(value) { this.value = value }

      function MoreValue(value) { this.value = value }
      MoreValue.prototype = Object.create(Value.prototype, {
        constructor: {value: MoreValue, configurable: true, writable: true}
      })

      var a = new Value(42)
      var b = new MoreValue(42)
      assert.fail(function() { Must(a).be.eql(b) })
    })
  })

  describe("given Object with valueOf", function() {
    it("must pass given equal value", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable(42)
      assert.pass(function() { Must(a).eql(b) })
    })

    it("must pass given equal value with unequivalent properties", function() {
      function Valuable(value, other) {
        this.value = value
        this.other = other
      }

      Valuable.prototype.valueOf = function() { return this.value }

      var a = new Valuable(42, 1), b = new Valuable(42, 2)
      assert.pass(function() { Must(a).eql(b) })
    })

    it("must pass given equal value but different valueOfs", function() {
      function Valuable(value) { this.valueOf = function() { return value } }
      var a = new Valuable(42), b = new Valuable(42)
      assert.pass(function() { Must(a).eql(b) })
    })

    it("must fail given unequivalent values", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable(69)
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must fail given differently typed values", function() {
      function Valuable(value) { this.value = value }
      Valuable.prototype.valueOf = function() { return this.value }
      var a = new Valuable(42), b = new Valuable("42")
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must pass given equivalent array values", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return [42, this.value] }
      var a = new Value(42)
      var b = new Value(42)
      assert.pass(function() { Must(a).eql(b) })
    })

    it("must fail given unequivalent array values", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return [42, this.value] }
      var a = new Value(42)
      var b = new Value(69)
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must pass given null inherited value objects", function() {
      function Value(value) { this.value = value }

      Value.prototype = Object.create(null, {
        constructor: {value: Value, configurable: true, writeable: true}
      })

      Value.prototype.valueOf = function() { return this.value }

      var a = new Value(42)
      var b = new Value(42)
      assert.pass(function() { Must(a).eql(b) })
    })

    it("must fail given instance and plain object", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return this.value }

      var a = new Value(42)
      var b = {valueOf: function() { return 42 }}
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must fail given different construtors", function() {
      function A(value) { this.value = value }
      A.prototype.valueOf = function() { return this.value }
      function B(value) { this.value = value }
      B.prototype.valueOf = function() { return this.value }
      assert.fail(function() { Must(new A(42)).eql(new B(42)) })
    })

    it("must fail given subclassed constructor", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return this.value }

      function MoreValue(value) { this.value = value }
      MoreValue.prototype = Object.create(Value.prototype, {
        constructor: {value: MoreValue, configurable: true, writable: true}
      })

      var a = new Value(42)
      var b = new MoreValue(42)
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must fail given overwritten constructor properties", function() {
      function A(value) { this.value = value }
      A.prototype.valueOf = function() { return this.value }
      function B(value) { this.value = value }
      B.prototype.valueOf = function() { return this.value }

      var a = new A(42)
      var b = new B(42)
      a.constructor = b.constructor = function() {}
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must return false given plain object", function() {
      var a = {valueOf: function() { return 1 }}
      var b = {valueOf: function() { return 1 }}
      assert.fail(function() { Must(a).eql(b) })
    })

    it("must return false given null inherited plain objects", function() {
      var a = Object.create(null); a.valueOf = function() { return 42 }
      var b = Object.create(null); b.valueOf = function() { return 42 }
      assert.fail(function() { Must(a).eql(b) })
    })
  })

  require("./_assertion_error_test")(function() { Must("secret").eql(42) }, {
    actual: "secret",
    expected: 42,
    diffable: true,
    message: "\"secret\" must be equivalent to 42"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must("secret").not.eql("secret") })
    })
  })
})

function testNull(egal) {
  it("must pass given nulls", function() {
    assert.pass(function() { egal(null, null) })
  })

  it("must pass given undefineds", function() {
    assert.pass(function() { egal(undefined, undefined) })
  })

  it("must fail given null and undefined", function() {
    assert.fail(function() { egal(null, undefined) })
    assert.fail(function() { egal(undefined, null) })
  })
}

function testBoolean(egal) {
  describe("given Boolean", function() {
    it("must pass given identical primitives", function() {
      assert.pass(function() { egal(true, true) })
      assert.pass(function() { egal(false, false) })
    })

    it("must fail given unidentical primitives", function() {
      assert.fail(function() { egal(true, false) })
      assert.fail(function() { egal(false, true) })
    })

    it("must pass given equivalent objects", function() {
      assert.pass(function() { egal(new Boolean(true), new Boolean(true)) })
      assert.pass(function() { egal(new Boolean(false), new Boolean(false)) })
    })

    it("must fail given unequivalent objects", function() {
      assert.fail(function() { egal(new Boolean(true), new Boolean(false)) })
      assert.fail(function() { egal(new Boolean(false), new Boolean(true)) })
    })

    it("must fail given equivalent primitive and object", function() {
      assert.fail(function() { egal(true, new Boolean(true)) })
      assert.fail(function() { egal(new Boolean(true), true) })
      assert.fail(function() { egal(false, new Boolean(false)) })
      assert.fail(function() { egal(new Boolean(false), false) })
    })
  })
}

function testNumber(egal) {
  describe("given Number", function() {
    it("must pass given identical primitives", function() {
      assert.pass(function() { egal(42, 42) })
    })

    it("must fail given unequivalent primitives", function() {
      assert.fail(function() { egal(42, 1337) })
    })

    it("must pass given equivalent objects", function() {
      assert.pass(function() { egal(new Number(42), new Number(42)) })
    })

    it("must fail given unequivalent objects", function() {
      assert.fail(function() { egal(new Number(42), new Number(69)) })
    })

    it("must fail given equivalent primitive and object", function() {
      assert.fail(function() { egal(42, new Number(42)) })
      assert.fail(function() { egal(new Number(42), 42) })
    })

    it("must fail given string primitive", function() {
      assert.fail(function() { egal(42, "42") })
    })

    it("must fail given string object", function() {
      assert.fail(function() { egal(42, new String("42")) })
    })

    describe("given -0", function() {
      it("must pass given primitives", function() {
        assert.pass(function() { egal(-0, +0) })
        assert.pass(function() { egal(+0, -0) })
      })

      it("must pass given objects", function() {
        assert.pass(function() { egal(new Number(-0), new Number(+0)) })
        assert.pass(function() { egal(new Number(+0), new Number(-0)) })
      })

      it("must fail given primitive and object", function() {
        assert.fail(function() { egal(-0, new Number(+0)) })
        assert.fail(function() { egal(new Number(-0), +0) })
      })
    })

    describe("given NaN", function() {
      it("must pass given primitives", function() {
        assert.pass(function() { egal(NaN, NaN) })
      })

      it("must pass given objects", function() {
        assert.pass(function() { egal(new Number(NaN), new Number(NaN)) })
      })

      it("must fail given primitive and object", function() {
        assert.fail(function() { egal(NaN, new Number(NaN)) })
        assert.fail(function() { egal(new Number(NaN), NaN) })
      })

      it("must fail given number and NaN", function() {
        assert.fail(function() { egal(42, NaN) })
        assert.fail(function() { egal(NaN, 42) })
      })
    })

    describe("given Infinity", function() {
      it("must pass given identical primitives", function() {
        assert.pass(function() { egal(Infinity, Infinity) })
        assert.pass(function() { egal(-Infinity, -Infinity) })
      })

      it("must fail given unequivalent primitives", function() {
        assert.fail(function() { egal(Infinity, -Infinity) })
        assert.fail(function() { egal(-Infinity, Infinity) })
      })

      it("must pass given equivalent objects", function() {
        assert.pass(function() {
          egal(new Number(Infinity), new Number(Infinity))
        })

        assert.pass(function() {
          egal(new Number(-Infinity), new Number(-Infinity))
        })
      })

      it("must fail given unequivalent objects", function() {
        assert.fail(function() {
          egal(new Number(Infinity), new Number(-Infinity))
        })
        assert.fail(function() {
          egal(new Number(-Infinity), new Number(Infinity))
        })
      })

      it("must fail given equivalent primitive and object", function() {
        assert.fail(function() { egal(Infinity, new Number(Infinity)) })
        assert.fail(function() { egal(new Number(Infinity), Infinity) })
        assert.fail(function() { egal(-Infinity, new Number(-Infinity)) })
        assert.fail(function() { egal(new Number(-Infinity), -Infinity) })
      })

      it("must fail given number and infinity", function() {
        assert.fail(function() { egal(42, Infinity) })
        assert.fail(function() { egal(42, -Infinity) })
      })
    })
  })
}

function testString(egal) {
  describe("given String", function() {
    it("must pass given identical primitives", function() {
      assert.pass(function() { egal("ok", "ok") })
    })

    it("must fail given unequivalent primitives", function() {
      assert.fail(function() { egal("ok", "nok") })
    })

    it("must pass given equivalent objects", function() {
      assert.pass(function() { egal(new String("a"), new String("a")) })
    })

    it("must fail given unequivalent objects", function() {
      assert.fail(function() { egal(new String("a"), new String("b")) })
    })

    it("must fail given equivalent primitive and object", function() {
      assert.fail(function() { egal("ok", new String("ok")) })
      assert.fail(function() { egal(new String("ok"), "ok") })
    })

    it("must fail given equivalent number primitive", function() {
      assert.fail(function() { egal("1", 1) })
    })

    it("must fail given equivalent number object", function() {
      assert.fail(function() { egal("1", new Number(1)) })
    })
  })
}

function testSymbol(egal) {
  var desc = typeof Symbol != "undefined" ? describe : xdescribe

  desc("given Symbol", function() {
    it("must pass given identical symbols", function() {
      var symbol = Symbol()
      assert.pass(function() { egal(symbol, symbol) })
    })

    it("must fail given two anonymous symbols", function() {
      assert.fail(function() { egal(Symbol(), Symbol()) })
    })

    it("must fail given two named symbols", function() {
      assert.fail(function() { egal(Symbol("iterator"), Symbol("iterator")) })
    })
  })
}

function testRegExp(egal) {
  describe("given RegExp", function() {
    it("must pass given equivalent regexps", function() {
      assert.pass(function() { egal(/a/, /a/) })
    })

    it("must fail given unequivalent regexps", function() {
      assert.fail(function() { egal(/a/, /b/) })
    })

    it("must fail given unequivalent flags", function() {
      assert.fail(function() { egal(/a/ig, /a/g) })
    })

    it("must fail given RegExp and string primitive", function() {
      assert.fail(function() { egal(/a/, "/a/") })
    })
  })
}

function testDate(egal) {
  describe("given Date", function() {
    it("must pass given identical dates", function() {
      var now = new Date
      assert.pass(function() { egal(now, now) })
    })

    it("must pass given equivalent dates", function() {
      assert.pass(function() { egal(new Date(7), new Date(7)) })
    })

    it("must fail given unequivalent dates", function() {
      assert.fail(function() { egal(new Date(69), new Date(42)) })
    })

    it("must fail given Date and number primitive", function() {
      assert.fail(function() { egal(new Date(69), 69) })
    })
  })
}

function testFunction(egal) {
  describe("given Function", function() {
    it("must pass given identical functions", function() {
      function fn() {}
      assert.pass(function() { egal(fn, fn) })
    })

    it("must fail given equivalent functions", function() {
      assert.fail(function() { egal(function() {}, function() {}) })
    })
  })
}

function testObjectProperties(egal, create) {
  describe("given Object with properties", function() {
    it("must pass given identical objects", function() {
      var obj = create({a: 42, b: 69})
      assert.pass(function() { egal(obj, obj) })
    })

    it("must pass given empty objects", function() {
      assert.pass(function() { Must(create({})).be.eql(create({})) })
    })

    it("must fail given an empty and filled object", function() {
      assert.fail(function() { egal({}, create({a: 42})) })
      assert.fail(function() { Must(create({a: 42})).be.eql(create({})) })
    })

    it("must fail given a smaller and larger object", function() {
      var a = create({a: 42, b: 69})
      var b = create({a: 42})
      assert.fail(function() { egal(a, b) })
      assert.fail(function() { egal(b, a) })
    })

    // This was a bug I discovered on Jun 12, 2015 related to not comparing
    // keys equivalence before comparing their values.
    it("must fail given equal amount of keys undefined keys", function() {
      var obj = {name: undefined}
      assert.fail(function() { egal(obj, {age: undefined}) })
      assert.fail(function() { egal(obj, {age: 13}) })
    })

    it("must pass given equivalent objects", function() {
      var a = create({a: 42, b: 69})
      var b = create({a: 42, b: 69})
      assert.pass(function() { egal(a, b) })
    })

    it("must fail given objects with differently typed properties", function() {
      var a = create({a: "42", b: 69})
      var b = create({a: 42, b: 69})
      assert.fail(function() { egal(a, b) })
    })

    it("must pass given an object with set constructor property", function() {
      var a = create({constructor: 1337})
      var b = create({constructor: 1337})
      assert.pass(function() { egal(a, b) })
    })

    it("must pass given a deep object", function() {
      var a = create({life: {love: 69}})
      var b = create({life: {love: 69}})
      assert.pass(function() { egal(a, b) })
    })

    it("must fail given an unequivalent deep object", function() {
      var a = create({life: {love: 69}})
      var b = create({life: {love: 42}})
      assert.fail(function() { egal(a, b) })
    })

    describe("with circular references", function() {
      it("must pass if equivalent", function() {
        var a = create({life: {love: 69}})
        a.self = a
        var b = create({life: {love: 69}})
        b.self = b

        assert.pass(function() { egal(a, b) })
      })

      it("must fail if only one circular", function() {
        var a = create({life: {love: 69}})
        a.self = a
        var b = create({life: {love: 69}})
        b.self = {life: {love: 69}, self: {}}

        assert.fail(function() { egal(a, b) })
        assert.fail(function() { egal(b, a) })
      })

      it("must fail if circular to different levels", function() {
        var a = create({life: {love: 69}})
        a.self = a

        var b = create({life: {love: 69}})
        var bInside = create({life: {love: 69}})
        bInside.self = bInside
        b.self = bInside

        assert.fail(function() { egal(a, b) })
        assert.fail(function() { egal(b, a) })
      })
    })
  })
}
