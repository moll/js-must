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
  it("must return an instance of Must", function() {
    assert(true.must.be instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.doesNotThrow(function() { (42).must.be.equal(42) })
  })

  it("must be like Must.prototype.equal", function() {
    assert.doesNotThrow(function() { false.must.be(false) })
    assert.throws(function() { true.must.be(false) })

    assert.doesNotThrow(function() { (42).must.be(42) })
    assert.throws(function() { (42).must.be(1337) })

    assert.doesNotThrow(function() { var obj = {}; obj.must.be(obj) })
    assert.throws(function() { ({}).must.be({}) })
  })
})

// Doing true.must automatically converts it to an object.
describe("Must.prototype.true", function() {
  it("must pass given true literal", function() {
    assert.doesNotThrow(function() { Must(true).be.true() })
  })

  it("must pass given true object", function() {
    assert.doesNotThrow(function() { true.must.be.true() })
  })

  it("must fail given not true literal", function() {
    assert.throws(function() { Must(false).be.true() })
  })

  it("must fail given not true object", function() {
    assert.throws(function() { false.must.be.true() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { false.must.be.true })
  })
})

// Doing false.must automatically converts it to an object.
describe("Must.prototype.false", function() {
  it("must pass given false literal", function() {
    assert.doesNotThrow(function() { Must(false).be.false() })
  })

  it("must pass given false", function() {
    assert.doesNotThrow(function() { false.must.be.false() })
  })

  it("must fail given not false literal", function() {
    assert.throws(function() { Must(true).be.false() })
  })

  it("must fail given not false object", function() {
    assert.throws(function() { true.must.be.false() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { true.must.be.false })
  })
})

describe("Must.prototype.null", function() {
  it("must pass given null", function() {
    assert.doesNotThrow(function() { Must(null).be.null() })
  })

  it("must not pass given true", function() {
    assert.throws(function() { Must(true).be.null() })
  })

  it("must not pass given false", function() {
    assert.throws(function() { Must(false).be.null() })
  })

  it("must not pass given undefined", function() {
    assert.throws(function() { Must(undefined).be.null() })
  })

  it("must not pass given empty string", function() {
    assert.throws(function() { Must("").be.null() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(null).be.null })
  })
})

describe("Must.prototype.undefined", function() {
  it("must pass given undefined", function() {
    assert.doesNotThrow(function() { Must(undefined).be.undefined() })
  })

  it("must not pass given true", function() {
    assert.throws(function() { Must(true).be.undefined() })
  })

  it("must not pass given false", function() {
    assert.throws(function() { Must(false).be.undefined() })
  })

  it("must not pass given null", function() {
    assert.throws(function() { Must(null).be.undefined() })
  })

  it("must not pass given empty string", function() {
    assert.throws(function() { Must("").be.undefined() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(undefined).be.undefined })
  })
})

describe("Must.prototype.truthy", function() {
  it("must pass given true literal", function() {
    assert.doesNotThrow(function() { Must(true).be.truthy() })
  })

  it("must pass given true object", function() {
    assert.doesNotThrow(function() { true.must.be.truthy() })
  })

  it("must fail given false literal", function() {
    assert.throws(function() { Must(false).be.truthy() })
  })

  it("must fail given false object", function() {
    assert.throws(function() { false.must.be.truthy() })
  })

  it("must pass given string literal", function() {
    assert.doesNotThrow(function() { Must("truthy").be.truthy() })
  })

  it("must pass given string object", function() {
    assert.doesNotThrow(function() { ("truthy").must.be.truthy() })
  })

  it("must pass given zero string literal", function() {
    assert.doesNotThrow(function() { Must("0").be.truthy() })
  })

  it("must pass given zero string object", function() {
    assert.doesNotThrow(function() { ("0").must.be.truthy() })
  })

  it("must fail given empty string literal", function() {
    assert.throws(function() { Must("").be.truthy() })
  })

  it("must fail given empty string object", function() {
    assert.throws(function() { ("").must.be.truthy() })
  })

  it("must pass given number literal", function() {
    assert.doesNotThrow(function() { Must(1).be.truthy() })
  })

  it("must pass given number object", function() {
    assert.doesNotThrow(function() { (1).must.be.truthy() })
  })

  it("must fail given zero number literal", function() {
    assert.throws(function() { Must(0).be.truthy() })
  })

  it("must fail given zero number object", function() {
    assert.throws(function() { (0).must.be.truthy() })
  })

  it("must fail given null", function() {
    assert.throws(function() { Must(null).be.truthy() })
  })

  it("must fail given undefined", function() {
    assert.throws(function() { Must(undefined).be.truthy() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { false.must.be.truthy })
  })
})

describe("Must.prototype.ok", function() {
  it("must be an alias of Must.prototype.truthy", function() {
    assert.strictEqual(Must.prototype.ok, Must.prototype.truthy)
  })
})

describe("Must.prototype.equal", function() {
  it("must pass when comparing true literals", function() {
    assert.doesNotThrow(function() { Must(true).be.equal(true) })
  })

  it("must pass when comparing true object to literal", function() {
    assert.doesNotThrow(function() { true.must.be.equal(true) })
  })

  it("must fail when comparing true objects", function() {
    assert.throws(function() { true.must.be.equal(new Boolean(true)) })
  })

  it("must fail when comparing true object to false literal", function() {
    assert.throws(function() { true.must.be.equal(false) })
  })

  it("must pass when comparing false literals", function() {
    assert.doesNotThrow(function() { Must(false).be.equal(false) })
  })

  it("must pass when comparing false object to literal", function() {
    assert.doesNotThrow(function() { false.must.be.equal(false) })
  })

  it("must fail when comparing false objects", function() {
    assert.throws(function() { false.must.be.equal(new Boolean(false)) })
  })

  it("must fail when comparing true object to false object", function() {
    assert.throws(function() { true.must.be.equal(new Boolean(false)) })
  })

  it("must pass when comparing equal number literals", function() {
    assert.doesNotThrow(function() { Must(42).be.equal(42) })
  })

  it("must pass when comparing equal number objects", function() {
    assert.doesNotThrow(function() { (42).must.be.equal(42) })
  })

  it("must fail when comparing unequal number literals", function() {
    assert.throws(function() { Must(42).be.equal(1337) })
  })

  it("must fail when comparing unequal number objects", function() {
    assert.throws(function() { (42).must.be.equal(1337) })
  })

  it("must pass when comparing equal string literals", function() {
    assert.doesNotThrow(function() { Must("ok").be.equal("ok") })
  })

  it("must pass when comparing equal string objects", function() {
    assert.doesNotThrow(function() { "ok".must.be.equal("ok") })
  })

  it("must fail when comparing unequal string literals", function() {
    assert.throws(function() { Must("ok").be.equal("nok") })
  })

  it("must fail when comparing unequal string objects", function() {
    assert.throws(function() { "ok".must.be.equal("nok") })
  })

  it("must pass when comparing equal date objects", function() {
    assert.doesNotThrow(function() {
      var now = new Date
      now.must.be.equal(now) 
    })
  })

  it("must fail when comparing unequal date objects", function() {
    assert.throws(function() { new Date().must.be.equal(new Date) })
  })

  it("must pass when comparing equal regexp objects", function() {
    assert.doesNotThrow(function() {
      var obj = new RegExp
      obj.must.be.equal(obj) 
    })
  })

  it("must fail when comparing unequal regexp objects", function() {
    assert.throws(function() { new RegExp().must.be.equal(new RegExp) })
  })
})
