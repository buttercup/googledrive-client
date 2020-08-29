const { Layerr } = require("layerr");

function handleError(err) {
    if (err.responseHeaders && err.responseHeaders["www-authenticate"]) {
        throw new Layerr({
            cause: err,
            info: {
                authFailure: /error=invalid_token/.test(err.responseHeaders["www-authenticate"])
            }
        }, "Request failed");
    }
    throw new Layerr(err, "Request failed");
}

module.exports = {
    handleError,
};
