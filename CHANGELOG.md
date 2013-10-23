## 0.7.0 (Oct 23, 2013)
- Adds [`contain`] as an alias of [`include`].

- Adds [`before`] as an alias of [`below`] to make comparing dates read more
  natural:

  ```javascript
  new Date(2000, 5, 18).must.be.before(new Date(2001, 0, 1))
  ```

- Adds [`after`] as an alias of [`above`] to make comparing dates read more
  natural:

  ```javascript
  new Date(2030, 5, 18).must.be.after(new Date(2013, 9, 23))
  ```

[`contain`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.contain
[`include`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.include
[`below`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.below
[`before`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.before
[`above`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.above
[`after`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.after

## 0.6.0 (Oct 15, 2013)
- Allows asserting both the exception constructor and its message together in
  the [`throw`] matcher:

  ```javascript
  someFunction.must.throw(RangeError, /out of bounds/)
  ```

[`throw`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.throw

## 0.5.0 (Oct 13, 2013)
- Sets the [`eql`] matcher's [`AssertionError`] diffable so some test
  runners would print out a property-by-property diff for mismatches. This helps
  visual comparison.

[`AssertionError`]: https://github.com/moll/js-must/blob/master/doc/API.md#AssertionError

## 0.4.0 (Oct 11, 2013)
- Changes [`eql`] so it also compares instances of the same class recursively
  like it does with plain objects.  
  If the instance has a `valueOf` function, however, its output is used as
  before.

[`eql`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.eql

## 0.3.0 (Oct 5, 2013)
- Allows asserting [`property`] and [`ownProperty`] on all types (such as
  functions, booleans etc.), not only objects.
- Allows asserting [`keys`] and [`ownKeys`] on all types (such as functions,
  booleans etc.), not only objects.
- Allows asserting [`enumerable`] and [`nonenumerable`] properties on all
  types (such as functions, booleans etc.), not only objects.

[`nonenumerable`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.nonenumerable
[`ownProperty`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.ownProperty

## 0.2.0 (Sep 26, 2013)
- Fails gracefully if property matchers ([`property`],
  [`enumerable`] etc.) are used on non-objects.
- Adds the [`keys`] matcher to test if an object has all
  the expected keys.  
  Takes inherited keys into account just like the [`empty`] and [`property`]
  matchers.
- Adds the [`ownKeys`] matcher to test if an object has all the expected keys
  of its own.

[`empty`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.empty
[`enumerable`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.enumerable
[`property`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.property
[`keys`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.keys
[`ownKeys`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.ownKeys

## 0.1.338 (Sep 26, 2013)
- Fixes Must.js's own tests on Windows thanks to [Bart van der Schoor][bartvds].
[bartvds]: https://github.com/Bartvds

## 0.1.337 (Sep 24, 2013)
- First release. Must-have!
