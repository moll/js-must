// Bootstrapping with Assert ^_^:
var assert = require("assert")
var Must = require("..")
var Path = require("path")

describe("Must", function() {
  it("must be instantiatable", function() {
    assert(new Must instanceof Must)
  })

  it("must return an instance of itself when called as a function", function() {
    assert(Must() instanceof Must)
  })
})

describe("Object.prototype.must", function() {
  it("must exist", function() {
    assert(true.must)
  })

  it("must return an instance of Must", function() {
    assert(true.must instanceof Must)
  })

  it("must be deletable", function() {
    delete Object.prototype.must
    assert(!true.must)
  })

  it("must allow setting", function() {
    var obj = {}
    obj.must = 42
    assert.equal(obj.must, 42)
  })

  describe("when called on", function() {
    it("must unbox boolean", function() {
      assert.strictEqual(true.must.actual, true)
    })

    it("must unbox number", function() {
      assert.strictEqual((42).must.actual, 42)
    })

    it("must unbox string", function() {
      assert.strictEqual("foo".must.actual, "foo")
    })

    it("must not unbox date", function() {
      var date = new Date
      date.valueOf = function() {}
      assert.strictEqual(date.must.actual, date)
    })

    it("must not unbox RegExp", function() {
      var regexp = new RegExp
      regexp.valueOf = function() {}
      assert.strictEqual(regexp.must.actual, regexp)
    })

    it("must not unbox array", function() {
      var array = []
      array.valueOf = function() {}
      assert.strictEqual(array.must.actual, array)
    })

    it("must not unbox object", function() {
      var object = {}
      object.valueOf = function() {}
      assert.strictEqual(object.must.actual, object)
    })

    it("must not unbox custom instance", function() {
      function Foo() {}
      Foo.prototype.valueOf = function() {}
      var foo = new Foo
      assert.strictEqual(foo.must.actual, foo)
    })
  })

  afterEach(function() {
    // Reload to reset the fiddling we did here.
    delete require.cache[Path.resolve(__dirname, "../index.js")]
    Must = require("..")
  })
})

describe("Global.must", function() {
  it("must be an instance of Must by default", function() {
    assert(must instanceof Must)
  })

  it("must be settable to the must function", function() {
    global.must = Must
    assert(typeof must == "function")
  })

  it("must be settable to 42", function() {
    global.must = 42
    assert.equal(must, 42)
  })

  afterEach(function() {
    delete global.must
  })
})

describe("Must.AssertionError", function() {
  it("must be named \"AssertionError\"", function() {
    var error = new Must.AssertionError("foo")
    assert.strictEqual(error.name, "AssertionError")
  })

  it("must be an instance of Error", function() {
    var error = new Must.AssertionError("foo")
    assert(error instanceof Error)
  })

  it("must have the right constructor", function() {
    var error = new Must.AssertionError("foo")
    assert.strictEqual(error.constructor, Must.AssertionError)
  })

  it("must have constructor as non-enumerable property", function() {
    var error = new Must.AssertionError("foo")
    for (var key in error) assert.notEqual(key, "constructor")
  })
})
