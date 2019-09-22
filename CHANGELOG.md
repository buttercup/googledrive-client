# Google Drive Client changelog

## v0.7.1
_2019-09-22_

 * **Bugfix**:
   * Size would be `NaN` for some items

## v0.7.0
_2019-08-28_

 * Replace `buffer` with `safe-buffer` for React-Native compatibility

## v0.6.1
_2019-08-25_

 * **Bugfix**: Remove forced-polyfill for `Buffer`

## v0.6.0
_2019-08-25_

 * Dynamically switch `Buffer` dependency if available

## v0.5.0
_2019-08-02_

 * Remove dependency on `UInt8Array` by using `buffer` package

## v0.4.3
_2019-08-02_

 * **Bugfix**:
   * Re-authorisation failed when response header keys were not all lower-case
 * Upgrade `cowl` for lower-case response header keys

## v0.4.2
_2019-07-26_

 * Rename `fullPath` to `dirPath` for `mapDirectoryContents` method

## v0.4.1
_2019-07-25_

 * **Bugfix**:
   * `mapDirectoryContents` would fail on repeated calls: "Cannot read property 'map' of undefined"

## v0.4.0
_2019-07-25_

 * `mapDirectoryContents` method added for traditional path lookups

## v0.3.1
_2019-07-22_

 * Upgrade `cowl` for better browser compatibility

## v0.3.0
_2019-07-19_

 * Request library `axios` replaced with `cowl`

## v0.2.1
_2019-03-13_

 * **Bugfix**:
   * `tree: true` result would fail when multiple pages of results are returned

## v0.2.0
_2019-03-03_

 * Use **VError** to pass a flag if authentication fails: `authFailure`

## v0.1.0
_2019-02-21_

 * Initial release
