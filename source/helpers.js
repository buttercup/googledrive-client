const { Layerr } = require("layerr");
const { fromByteArray } = require("base64-js");

function encodeBase64(text) {
    const byteArray = (new TextEncoder()).encode(text);
    return fromByteArray(byteArray);
}

function handleError(err) {
    if (err.responseHeaders && err.responseHeaders["www-authenticate"]) {
        throw new Layerr({
            cause: err,
            info: {
                authFailure: /error=(")?invalid_token/.test(err.responseHeaders["www-authenticate"])
            }
        }, "Request failed");
    }
    throw new Layerr(err, "Request failed");
}

module.exports = {
    encodeBase64,
    handleError,
};
