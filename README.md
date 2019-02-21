# Google Drive Client
> Client for making basic Google Drive requests

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
