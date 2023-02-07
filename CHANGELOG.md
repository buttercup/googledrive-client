# Google Drive Client changelog

## v2.1.0
_2023-02-07_

 * Replace `cross-fetch` with [`@buttercup/fetch`](https://github.com/buttercup/fetch)

## v2.0.1
_2023-01-31_

 * **Bugfix**:
   * Error handling would miss expired tokens due to newly added quotes (thanks Google)

## v2.0.0
_2022-12-26_

 * **Major Release**
   * ESM-only release
   * `fetch` for requests, instead of `cowl`/`XMLHttpRequest`
   * Simplifed client method options

## v1.3.3
_2022-01-30_

 * `cowl` upgrade for `Layerr` info pass-through

## v1.3.2
_2022-01-30_

 * **Bugfix**:
   * Revert `is-in-browser` for `cowl`

## v1.3.1
_2022-01-29_

 * **Bugfix**:
   * `cowl`: Handle `null` response headers in request error

## v1.3.0
_2021-11-22_

 * `createDirectory` method

## v1.2.0
_2020-09-06_

 * Replace `js-base64` with `base64-js` (to remove `Buffer` reference)

## v1.1.0
_2020-08-29_

 * Upgrade `cowl` - remove `buffer` dependency

## v1.0.0
_2020-08-29_

 * Remove `safe-buffer` (and `buffer`) dependencies
 * Encode file contents as base64 before sending
 * Drop support for NodeJS < 10

## v0.8.0
_2019-09-22_

 * `deleteFile` method

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
