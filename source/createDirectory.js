const { encodeBase64, handleError } = require("./helpers.js");
const { MIME_FOLDER } = require("./symbols.js");

const DIRECTORY_CREATE_URL = "https://www.googleapis.com/upload/drive/v3/files";

function createDirectory(token, patcher, {
    parentID,
    // id,
    // contents = "",
    name
} = {}) {
    const parents = parentID ? [parentID] : [];
    const options = {
        url: DIRECTORY_CREATE_URL,
        method: "POST",
        // query: {
        //     uploadType: "multipart"
        // },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            // "Content-Length": size.toString()
        },
        body: JSON.stringify({
            mimeType: MIME_FOLDER,
            name,
            parents
        })
    };
    return patcher.execute("request", options)
        .then(res => res.data.id)
        .catch(handleError);
}

module.export = {
    createDirectory
};
