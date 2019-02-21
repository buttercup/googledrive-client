const { handleError, handleResponse } = require("./helpers.js");

const BOUNDARY_MARK = "--";
const CONTENT_TYPE_JSON = "Content-Type: application/json; charset=UTF-8";
const CONTENT_TYPE_TEXT = "Content-Type: text/plain; charset=UTF-8";
const NEW_LINE = "\r\n";

function getFileContents(token, patcher, id) {
    const options = {
        url: `https://www.googleapis.com/drive/v3/files/${id}`,
        method: "GET",
        params: {
            alt: "media"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return patcher.execute("request", options)
        .then(handleResponse)
        .then(resp => resp.data)
        .catch(handleError);
}

function putFileContents(token, patcher, {
    parentID,
    id,
    contents = "",
    name
} = {}) {
    const boundary = `BCUP_DRV_UPL_${Math.floor(Math.random() * 1000000)}`;
    const url = id
        ? `https://www.googleapis.com/upload/drive/v3/files/${id}`
        : "https://www.googleapis.com/upload/drive/v3/files";
    const method = id
        ? "PATCH"
        : "POST";
    const rawMetadata = {};
    if (parentID) {
        rawMetadata.parents = [parentID];
    }
    if (name) {
        rawMetadata.name = name;
    }
    const metadata = JSON.stringify(rawMetadata);
    const postDataMeta = [
        NEW_LINE, BOUNDARY_MARK, boundary, NEW_LINE,
        CONTENT_TYPE_JSON, NEW_LINE, NEW_LINE
    ].join("");
    const postDataFile = [
        NEW_LINE, BOUNDARY_MARK, boundary, NEW_LINE,
        CONTENT_TYPE_TEXT, NEW_LINE, NEW_LINE
    ].join("");
    const postDataEnd = [
        NEW_LINE, BOUNDARY_MARK, boundary, BOUNDARY_MARK, NEW_LINE
    ].join("");
    const size = postDataMeta.length + metadata.length + postDataFile.length + contents.length + postDataEnd.length;
    const data = [];
    [postDataMeta, metadata, postDataFile, contents, postDataEnd].forEach(item => {
        for (let i = 0; i < item.length; i += 1) {
            data.push(item.charCodeAt(i) & 0xFF);
        }
    })
    const ui8a = Uint8Array.from(data);
    const payload = ui8a.buffer;
    const options = {
        url,
        method,
        params: {
            uploadType: "multipart"
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
            "Content-Length": size.toString()
        },
        data: payload
    };
    return patcher.execute("request", options)
        .then(handleResponse)
        .then(res => res.data.id)
        .catch(handleError);
}

module.exports = {
    getFileContents,
    putFileContents
};
