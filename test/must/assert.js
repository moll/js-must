var $ = require("oolong")
var assert = require("assert")
var Must = require("../..")

exports = module.exports = assert.bind(null)

$.assign(exports, assert)

exports.pass = function(fn) { exports.doesNotThrow(fn) }

exports.fail = function(fn) { exports.throws(fn, Must.AssertionError) }
