# Google Drive Client
> Client for making basic Google Drive requests

[![Build Status](https://travis-ci.org/buttercup/googledrive-client.svg?branch=master)](https://travis-ci.org/buttercup/googledrive-client) [![npm version](https://badge.fury.io/js/%40buttercup%2Fgoogledrive-client.svg)](https://www.npmjs.com/package/@buttercup/googledrive-client)

## About

This library allows for performing basic actions against Google's RESTful Drive API. It supports **fetching directory contents**, **reading** files and **writing** files. Note that file reading & writing is only supported with text files currently. It uses [axios](https://github.com/axios/axios) to perform requests, which has been proven to be a stable cross-platform library perfect for this purpose.

## Usage

Install the client by running the following:

```shell
npm install @buttercup/googledrive-client
```

The library exports a factory which can be used to create client adapters. The factory takes a Google Drive OAuth token.

```javascript
const { createClient } = require("@buttercup/googledrive-client");

const client = createClient(myToken);

client.getDirectoryContents({ tree: true }).then(tree => {
    // ...
})

// Or return a flat structure with all files and directories:
client.getDirectoryContents();
```

Make sure to check out the [API documentation](API.md) for more information.

### Token expiration or invalid credentials

This library uses [`VError`](https://github.com/joyent/node-verror) to pass extra error information around, such as when authentication fails while making a request. This makes it easier for downstream libraries to handle such authorisation failures, perhaps by requesting a new token.

If an error is thrown, use `VError` to extract the information from it to test if an authorisation failure has occurred:

```javascript
client.getDirectoryContents().catch(err => {
    const { authFailure = false } = VError.info(err);
    // handle authFailure === true
});
```

### Getting directory contents using a path

This library supports fetching directory contents by using a path, for a more traditional field. This method is **not recommended** for all use cases as it doesn't support items in the same level with the _same name_. Consider it experimental.

```javascript
const { createClient } = require("@buttercup/googledrive-client");

const client = createClient(myToken);

client.mapDirectoryContents("/").then(arrayOfFiles => {
    // ...
})
```

**NB:** Items are placed in the root if (and only if) their parents are not resolvable. They may have parent IDs specified in the result - if a parent can be found for a file, it is in that items sub-directory, whereas if the parent cannot be found it is in the root.
