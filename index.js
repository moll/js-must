exports = module.exports = function() {}

Object.defineProperty(Object.prototype, "must", {
  set: function() {},
  get: function() { return new exports(this) },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})
