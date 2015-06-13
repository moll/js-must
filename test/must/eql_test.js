var $ = require("oolong")
var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.eql", function() {
  // Allow using new Boolean:
  /* jshint -W053 */

  it("must pass given nulls", function() {
    assert.pass(function() { Must(null).be.eql(null) })
  })

  it("must pass given undefineds", function() {
    assert.pass(function() { Must(undefined).be.eql(undefined) })
  })

  it("must fail given null and undefined", function() {
    assert.fail(function() { Must(null).be.eql(undefined) })
    assert.fail(function() { Must(undefined).be.eql(null) })
  })

  it("must fail given an empty array and empty object", function() {
    // Can't think of an assertion library that would be nuts enough to consider
    // {} equivalent to []. Oh yeah, I can! For fucks sake, this is reason #42
    // why Must.js is better!
    assert.fail(function() { Must({}).be.eql([]) })
    assert.fail(function() { Must([]).be.eql({}) })
  })

  describe("given Boolean", function() {
    function mustPassBooleanEql(bool) {
      it("must pass given "+bool+" literals", function() {
        assert.pass(function() { Must(bool).be.eql(bool) })
      })

      it("must pass given "+bool+" literal and object", function() {
        assert.pass(function() { Must(bool).be.eql(new Boolean(bool)) })
        assert.pass(function() { Must(new Boolean(bool)).be.eql(bool) })
      })

      it("must pass given "+bool+" objects", function() {
        assert.pass(function() {
          Must(new Boolean(bool)).be.eql(new Boolean(bool))
        })
      })

      it("must fail given "+bool+" and "+!bool+" literals ", function() {
        assert.fail(function() { Must(bool).be.eql(!bool) })
      })

      it("must fail given "+bool+" and "+!bool+" objects", function() {
        assert.fail(function() {
          Must(new Boolean(bool)).be.eql(new Boolean(!bool))
        })
      })
    }

    mustPassBooleanEql(true)
    mustPassBooleanEql(false)
  })

  describe("given Number", function() {
    it("must pass given equivalent literals", function() {
      assert.pass(function() { Must(42).be.eql(42) })
    })

    it("must pass given equivalent literal and object", function() {
      assert.pass(function() { Must(42).be.eql(new Number(42)) })
      assert.pass(function() { Must(new Number(42)).be.eql(42) })
    })

    it("must pass given equivalent objects", function() {
      assert.pass(function() { Must(new Number(42)).be.eql(new Number(42)) })
    })

    it("must fail given unequivalent literals", function() {
      assert.fail(function() { Must(42).be.eql(1337) })
    })

    it("must fail given unequivalent objects", function() {
      assert.fail(function() { Must(new Number(42)).be.eql(new Number(69)) })
    })

    it("must fail given string", function() {
      assert.fail(function() { Must(42).eql("42") })
    })

    it("must pass given Infinities", function() {
      assert.pass(function() { Must(Infinity).eql(Infinity) })
    })

    it("must pass given -Infinities", function() {
      assert.pass(function() { Must(-Infinity).eql(-Infinity) })
    })

    it("must fail given Infinity and -Infinity", function() {
      assert.fail(function() { Must(Infinity).eql(-Infinity) })
      assert.fail(function() { Must(-Infinity).eql(Infinity) })
    })

    it("must pass given NaNs", function() {
      assert.pass(function() { Must(NaN).eql(NaN) })
    })

    it("must fail given number and NaN", function() {
      assert.fail(function() { Must(42).eql(NaN) })
      assert.fail(function() { Must(NaN).eql(42) })
    })
  })

  describe("given String", function() {
    it("must pass given equivalent literals", function() {
      assert.pass(function() { Must("ok").be.eql("ok") })
    })

    it("must pass given equivalent literal and object", function() {
      assert.pass(function() { Must("ok").be.eql(new String("ok")) })
      assert.pass(function() { Must(new String("ok")).be.eql("ok") })
    })

    it("must pass given equivalent objects", function() {
      assert.pass(function() { Must(new String("ok")).be.eql(new String("ok")) })
    })

    it("must fail given unequivalent literals", function() {
      assert.fail(function() { Must("ok").be.eql("nok") })
    })

    it("must fail given unequivalent objects", function() {
      assert.fail(function() { Must(new String("ok")).be.eql(new String("no")) })
    })

    it("must fail given equivalent number literal", function() {
      assert.fail(function() { Must("1").be.eql(1) })
    })

    it("must fail given equivalent number object", function() {
      assert.fail(function() { Must("1").be.eql(new Number(1)) })
    })

    it("must fail given number", function() {
      assert.fail(function() { Must("42").eql(42) })
    })
  })

  describe("given RegExp", function() {
    it("must pass given equivalent regexps", function() {
      assert.pass(function() { Must(/a/).be.eql(/a/) })
    })

    it("must fail given unequivalent regexps", function() {
      assert.fail(function() { Must(/a/).be.eql(/b/) })
    })
  })

  describe("given Date", function() {
    it("must pass given identical dates", function() {
      var now = new Date
      assert.pass(function() { Must(now).be.eql(now) })
    })

    it("must pass given equivalent dates", function() {
      assert.pass(function() { Must(new Date(7)).be.eql(new Date(7)) })
    })

    it("must fail given unequivalent dates", function() {
      assert.fail(function() { Must(new Date(69)).be.eql(new Date(42)) })
    })
  })

  describe("given Array", function() {
    it("must pass empty equivalent arrays", function() {
      assert.pass(function() { Must([]).be.eql([]) })
    })

    it("must pass given equivalent arrays", function() {
      assert.pass(function() { Must([1]).be.eql([1]) })
    })

    it("must pass given identical arrays", function() {
      var array = new Array
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

    it("must fail given equivalent nested arrays", function() {
      assert.fail(function() { Must([1, [2], 3]).be.eql([1, [42], 3]) })
    })

    describe("with circular references", function() {
      it("must pass if equal", function() {
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
        var b = [1, 2, 3]
        b.push([1, 2, 3, 4, 5])
        b.push(5)

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
  })

  describe("given Function", function() {
    it("must pass given identical functions", function() {
      function fn() {}
      assert.pass(function() { Must(fn).be.eql(fn) })
    })

    it("must fail given equivalent functions", function() {
      assert.fail(function() {
        Must(function() {}).be.eql(function() {})
      })
    })
  })

  function mustPassObjectEql(create) {
    it("must pass given identical objects", function() {
      var obj = create({a: 42, b: 69})
      assert.pass(function() { Must(obj).be.eql(obj) })
    })

    it("must pass given empty objects", function() {
      assert.pass(function() { Must(create({})).be.eql(create({})) })
    })

    it("must fail given an empty and filled object", function() {
      assert.fail(function() { Must({}).be.eql(create({a: 42})) })
      assert.fail(function() { Must(create({a: 42})).be.eql(create({})) })
    })

    it("must fail given a smaller and larger object", function() {
      var a = create({a: 42, b: 69})
      var b = create({a: 42})
      assert.fail(function() { Must(a).be.eql(b) })
      assert.fail(function() { Must(b).be.eql(a) })
    })

    it("must pass given equivalent objects", function() {
      var a = create({a: 42, b: 69})
      var b = create({a: 42, b: 69})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must fail given objects with differently typed properties", function() {
      var a = create({a: "42", b: 69})
      var b = create({a: 42, b: 69})
      assert.fail(function() { Must(a).be.eql(b) })
    })

    it("must pass given an object with set constructor property", function() {
      var a = create({constructor: 1337})
      var b = create({constructor: 1337})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must pass given a deep object", function() {
      var a = create({life: {love: 69}})
      var b = create({life: {love: 69}})
      assert.pass(function() { Must(a).be.eql(b) })
    })

    it("must fail given an unequivalent deep object", function() {
      var a = create({life: {love: 69}})
      var b = create({life: {love: 42}})
      assert.fail(function() { Must(a).be.eql(b) })
    })

    // This was a bug I discovered on Jun 12, 2015 related to not comparing
    // keys equivalence before comparing their values.
    it("must return false given equal amount of keys undefined keys",
      function() {
      var obj = {name: undefined}
      assert.fail(function() { Must(obj).be.eql({age: undefined}) })
      assert.fail(function() { Must(obj).be.eql({age: 13}) })
    })

    describe("with circular references", function() {
      it("must pass if equal", function() {
        var a = create({life: {love: 69}})
        a.self = a
        var b = create({life: {love: 69}})
        b.self = b

        assert.pass(function() { Must(a).be.eql(b) })
      })

      it("must fail if only one circular", function() {
        var a = create({life: {love: 69}})
        a.self = a
        var b = create({life: {love: 69}})
        b.self = {life: {love: 69}, self: {}}

        assert.fail(function() { Must(a).be.eql(b) })
        assert.fail(function() { Must(b).be.eql(a) })
      })

      it("must fail if circular to different levels", function() {
        var a = create({life: {love: 69}})
        a.self = a
        var b = create({life: {love: 69}})
        var bInside = create({life: {love: 69}})
        bInside.self = bInside
        b.self = bInside

        assert.fail(function() { Must(a).be.eql(b) })
        assert.fail(function() { Must(b).be.eql(a) })
      })
    })
  }

  describe("given Object", function() {
    mustPassObjectEql(function(obj) { return obj })

    describe("with inheritance", function() {
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
  })

  describe("given instance", function() {
    function Model() {}

    mustPassObjectEql(function(obj) { return $.assign(new Model, obj) })

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

    describe("given valueOf", function() {
      it("must pass given identical output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable(42)
        assert.pass(function() { Must(a).eql(b) })
      })

      it("must pass given identical output but different objects", function() {
        function Valuable(value, other) {
          this.value = value
          this.other = other
        }

        Valuable.prototype.valueOf = function() { return this.value }

        var a = new Valuable(42, 1), b = new Valuable(42, 2)
        assert.pass(function() { Must(a).eql(b) })
      })

      it("must pass given unidentical valueOf functions with equivalent output",
        function() {
        function Valuable(value) { this.valueOf = function() { return value } }
        var a = new Valuable(42), b = new Valuable(42)
        assert.pass(function() { Must(a).eql(b) })
      })

      it("must fail given unequivalent output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable(69)
        assert.fail(function() { Must(a).eql(b) })
      })

      it("must fail given differently typed output", function() {
        function Valuable(value) { this.value = value }
        Valuable.prototype.valueOf = function() { return this.value }
        var a = new Valuable(42), b = new Valuable("42")
        assert.fail(function() { Must(a).eql(b) })
      })

      it("must fail given identical output from different instances",
        function() {
        function A(value) { this.value = value }
        A.prototype.valueOf = function() { return this.value }
        function B(value) { this.value = value }
        B.prototype.valueOf = function() { return this.value }
        assert.fail(function() { Must(new A(42)).eql(new B(42)) })
      })

      it("must fail given identical output from different instances with set constructor property", function() {
        function A(value) { this.value = value }
        A.prototype.valueOf = function() { return this.value }
        function B(value) { this.value = value }
        B.prototype.valueOf = function() { return this.value }

        var a = new A(42)
        var b = new B(42)
        a.constructor = b.constructor = function() {}
        assert.fail(function() { Must(a).eql(b) })
      })

      it("must fail given identical output from heir", function() {
        function Parent(value) { this.value = value }
        Parent.prototype.valueOf = function() { return this.value }

        function Child(value) { this.value = value }
        Child.prototype = Object.create(Parent.prototype)
        Child.prototype.constructor = Child

        assert.fail(function() { Must(new Parent(42)).eql(new Child(42)) })
      })
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
