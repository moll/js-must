var Path = require("path")
var Must
var assert = require("assert")

function reload() {
  // Reload to reset the fiddling we did here.
  delete require.cache[Path.resolve(__dirname, "../register.js")]
  Must = require("../register")
}

describe("Object.prototype.must", function() {
  beforeEach(reload)
  afterEach(function() { delete Object.prototype.must })

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
    // Allow using Boolean, Number, String as constructor in tests:
    /* jshint -W053 */
    /* eslint no-new-wrappers: 0 */

    it("must not box boolean", function() {
      assert.strictEqual(true.must.actual, true)
    })

    it("must not box number", function() {
      assert.strictEqual((42).must.actual, 42)
    })

    it("must not box string", function() {
      assert.strictEqual("foo".must.actual, "foo")
    })

    it("must leave boxed boolean as-is", function() {
      var boolean = new Boolean(true)
      assert.strictEqual(boolean.must.actual, boolean)
    })

    it("must leave boxed number as-is", function() {
      var number = new Number(42)
      assert.strictEqual(number.must.actual, number)
    })

    it("must leave boxed string as-is", function() {
      var string = new String("hello")
      assert.strictEqual(string.must.actual, string)
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
})

describe("Global.must", function() {
  /* global must */
  beforeEach(reload)
  afterEach(function() { delete global.must })

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
})
