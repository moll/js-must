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

describe("Must.prototype.be", function() {
  it("must return itself", function() {
    var must = true.must
    assert.strictEqual(must, must.be)
  })
})

describe("Must.prototype.true", function() {
  it("must not throw when true", function() {
    assert.doesNotThrow(function() { true.must.be.true() })
  })

  it("must throw when not true", function() {
    assert.throws(function() { false.must.be.true() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { false.must.be.true })
  })
})

describe("Must.prototype.false", function() {
  it("must not throw when false", function() {
    assert.doesNotThrow(function() { false.must.be.false() })
  })

  it("must throw when not false", function() {
    assert.throws(function() { true.must.be.false() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { true.must.be.false })
  })
})
