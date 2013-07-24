exports = module.exports = function(obj) {
  if (!(this instanceof exports)) return new exports(obj)
}

Object.defineProperty(Object.prototype, "must", {
  get: function() { return new exports(this) },

  set: function(value) {
    Object.defineProperty(this, "must", {
      value: value,
      writable: true,
      configurable: true,
      enumrable: true
    })
  },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})
