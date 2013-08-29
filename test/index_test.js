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
