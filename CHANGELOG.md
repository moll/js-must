## Unreleased
- Allows asserting [`enumerable`][] and [`nonenumerable`][] properties on
  all types (such as functions, booleans etc.), not only objects.

[`nonenumerable`]: https://github.com/moll/js-must/blob/master/doc/API.md#Must.prototype.nonenumerable

## 0.2.0 (Sep 26, 2013)
- Fails gracefully if property matchers ([`property`][],
  [`enumerable`][] etc.) are used on non-objects.
- Adds the [`keys`][] matcher to test if an object has all
  the expected keys.  
  Takes inherited keys into account just like the [`empty`][] and [`property`][]
  matchers.
- Adds the [`ownKeys`][] matcher to test if an object has all the expected keys
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
