const { handleError } = require("./helpers.js");
const { MIME_FOLDER } = require("./symbols.js");

const DIRECTORY_CREATE_URL = "https://www.googleapis.com/drive/v3/files";

function createDirectory(token, patcher, {
    parentID,
    name
} = {}) {
    const parents = parentID ? [parentID] : [];
    const options = {
        url: DIRECTORY_CREATE_URL,
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: {
            mimeType: MIME_FOLDER,
            name,
            parents
        }
    };
    return patcher.execute("request", options)
        .then(res => res.data.id)
        .catch(handleError);
}

module.exports = {
    createDirectory
};
