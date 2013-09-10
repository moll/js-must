// Bootstrapping with Assert ^_^:
var assert = require("assert")
var Must = require("..")
var Path = require("path")

describe("Must", function() {
  it("must return an instance of itself when called as a function", function() {
    assert(Must() instanceof Must)
  })

  it("must have a constructor property", function() {
    assert.strictEqual(new Must().constructor, Must)
  })

  it("must have constructor as a non-enumerable property", function() {
    var must = new Must
    for (var key in must) assert.notEqual(key, "constructor")
  })

  it("must have name", function() {
    assert.strictEqual(Must.name, "Must")
  })

  describe("new", function() {
    it("must return an instance of Must", function() {
      assert(new Must instanceof Must)
    })
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

  it("must be non-enumerable", function() {
    for (var key in this) assert.notEqual(key, "must")
  })

  it("must be writable", function() {
    var obj = {}
    obj.must = 42
    assert.strictEqual(obj.must, 42)
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

  it("must be writable", function() {
    global.must = 42
    assert.strictEqual(must, 42)
  })

  it("must be writable to Must", function() {
    global.must = Must
    assert.strictEqual(must, Must)
  })

  afterEach(function() {
    delete global.must
  })
})
