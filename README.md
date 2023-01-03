# Google Drive Client
> Client for making basic Google Drive requests

![build status](https://github.com/buttercup/googledrive-client/actions/workflows/test.yml/badge.svg) [![npm version](https://badge.fury.io/js/%40buttercup%2Fgoogledrive-client.svg)](https://www.npmjs.com/package/@buttercup/googledrive-client)

## About

This library allows for performing basic actions against Google's RESTful Drive API. It supports **fetching directory contents**, **reading** files and **writing** files. Note that file reading & writing is only supported with text files currently. It uses `fetch` ([cross-fetch](https://github.com/lquixada/cross-fetch)) to perform requests, which will obviously work in a reproducible fassion across environments.

## Usage

Install the client by running the following:

```shell
npm install @buttercup/googledrive-client
```

_The latest version (v2) requires an [ESM](https://nodejs.org/api/esm.html) environment to run. It is not available to standard CommonJS projects._

The library exports a factory which can be used to create client adapters. The factory takes a Google Drive OAuth token.

```typescript
import { GoogleDriveClient } from "@buttercup/googledrive-client";

const client = new GoogleDriveClient(myToken);

client.getDirectoryContents(/* tree: */ true /* (default) */).then(tree => {
    // ...
})

// Or return a flat structure with all files and directories:
client.getDirectoryContents();
```

### Token expiration or invalid credentials

This library uses [`Layerr`](https://github.com/perry-mitchell/layerr) to pass extra error information around, such as when authentication fails while making a request. This makes it easier for downstream libraries to handle such authorisation failures, perhaps by requesting a new token.

If an error is thrown, use `Layerr` to extract the information from it to test if an authorisation failure has occurred:

```typescript
client.getDirectoryContents().catch(err => {
    const { authFailure = false } = Layerr.info(err);
    // handle authFailure === true
});
```

### Getting directory contents using a path

This library supports fetching directory contents by using a path, for a more traditional field. This method is **not recommended** for all use cases as it doesn't support items in the same level with the _same name_. Consider it experimental.

```typescript
import { GoogleDriveClient } from "@buttercup/googledrive-client";

const client = new GoogleDriveClient(myToken);

client.mapDirectoryContents("/").then(arrayOfFiles => {
    // ...
})
```

**NB:** Items are placed in the root if (and only if) their parents are not resolvable. They may have parent IDs specified in the result - if a parent can be found for a file, it is in that items sub-directory, whereas if the parent cannot be found it is in the root.
