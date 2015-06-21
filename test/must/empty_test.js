var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.empty", function() {
  // Allow using new Boolean:
  /* jshint -W053 */
  /* eslint no-new-wrappers: 0 */

  describe("given Boolean", function() {
    it("must fail given a boolean primitive", function() {
      assert.fail(function() { Must(true).be.empty() })
      assert.fail(function() { Must(false).be.empty() })
    })

    it("must pass given a boolean object", function() {
      assert.pass(function() { Must(new Boolean(true)).be.empty() })
      assert.pass(function() { Must(new Boolean(false)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Boolean(false)
      obj.life = 42
      assert.fail(function() { Must(obj).be.empty() })
    })
  })

  describe("given Number", function() {
    it("must fail given an zero primitive", function() {
      assert.fail(function() { Must(0).be.empty() })
    })

    it("must fail given a non-zero primitive", function() {
      assert.fail(function() { Must(1).be.empty() })
    })

    it("must pass given a zero object", function() {
      assert.pass(function() { Must(new Number).be.empty() })
    })

    it("must pass given a non-zero object", function() {
      assert.pass(function() { Must(new Number(1)).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new Number(1)
      obj.life = 42
      assert.fail(function() { Must(obj).be.empty() })
    })
  })

  describe("given String", function() {
    it("must pass given an empty primitive", function() {
      assert.pass(function() { Must("").be.empty() })
    })

    it("must fail given a non-empty primitive", function() {
      assert.fail(function() { Must("a").be.empty() })
    })

    it("must pass given an empty object", function() {
      assert.pass(function() { Must(new String).be.empty() })
    })

    it("must fail given a non-empty object", function() {
      assert.fail(function() { Must(new String("a")).be.empty() })
    })
  })

  describe("given RegExp", function() {
    it("must pass given an empty object", function() {
      assert.pass(function() { Must(new RegExp).be.empty() })
    })

    it("must pass given a non-empty object", function() {
      assert.pass(function() { Must(new RegExp("a")).be.empty() })
    })

    it("must fail given a non-empty object with keys", function() {
      var obj = new RegExp("a")
      obj.life = 42
      assert.fail(function() { Must(obj).be.empty() })
    })
  })

  describe("given Array", function() {
    it("must pass given an empty primitive", function() {
      assert.pass(function() { Must([]).be.empty() })
    })

    it("must fail given a non-empty primitive", function() {
      assert.fail(function() { Must([1]).be.empty() })
    })
  })

  describe("given Function", function() {
    it("should pass given an empty object", function() {
      assert.pass(function() { Must(function() {}).be.empty() })
    })

    it("should pass given a non-empty object", function() {
      assert.pass(function() { Must(function() { assert() }).be.empty() })
    })

    it("should fail given a non-empty object with keys", function() {
      function fn() {}
      fn.life = 42
      assert.fail(function() { Must(fn).be.empty() })
    })
  })

  describe("given Object", function() {
    it("must pass given an empty object", function() {
      assert.pass(function() { Must({}).be.empty() })
    })

    it("must fail given a non-empty object", function() {
      assert.fail(function() { Must({life: 42}).be.empty() })
    })

    it("must fail given a non-empty inherited object", function() {
      assert.fail(function() { Must(Object.create({life: 42})).be.empty() })
    })
  })

  describe("given instance", function() {
    function Foo() {}
    function Bar() { this.life = 42 }

    it("must pass given an empty instance", function() {
      assert.pass(function() { Must(new Foo()).be.empty() })
    })

    it("must fail given a non-empty instance", function() {
      assert.fail(function() { Must(new Bar()).be.empty() })
    })
  })

  require("./_assertion_error_test")(function() { Must([1]).be.empty() }, {
    actual: [1],
    message: "[1] must be empty"
  })

  describe(".not", function() {
    it("must invert the assertion", function() {
      assert.fail(function() { Must([]).not.be.empty() })
    })
  })
})
