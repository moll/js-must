exports.setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  /* eslint no-proto: 0 */
  obj.__proto__ = prototype
  return obj
}

exports.startsWith = String.prototype.startsWith ?
  Function.call.bind(String.prototype.startsWith) :
  function(haystack, needle) {
  return haystack.lastIndexOf(needle, 0) === 0
}

exports.endsWith = String.prototype.endsWith ?
  Function.call.bind(String.prototype.endsWith) :
  function(haystack, needle) {
  return haystack.indexOf(needle, haystack.length - needle.length) >= 0
}

// A *very* crude Map ponyfill, supports only: size, get, set, delete
exports.Map = typeof Map !== 'undefined' ?
  Map :
  (function () {
  function Map () {
    this._keys = []
    this._values = []
    this.size = 0
  }

  Map.prototype.get = function (key) {
    var i = this._keys.indexOf(key)

    if (i > -1) return this._values[i]
  }

  Map.prototype.set = function (key, value) {
    var i = this._keys.indexOf(key)

    if (i === -1) {
      i = this._keys.length
      this._keys[i] = key
      ++this.size
    }

    this._values[i] = value
    return this
  }

  Map.prototype.delete = function (key) {
    var i = this._keys.indexOf(key)

    if (i > -1) {
      this._keys.splice(i, 1)
      this._values.splice(i, 1)
      --this.size
      return true
    }

    return false
  }

  return Map
})()
