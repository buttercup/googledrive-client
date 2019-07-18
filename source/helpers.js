const VError = require("verror");

function handleError(err) {
    if (err.responseHeaders && err.responseHeaders["www-authenticate"]) {
        throw new VError({
            cause: err,
            info: {
                authFailure: /error=invalid_token/.test(err.responseHeaders["www-authenticate"])
            }
        }, "Request failed");
    }
    throw new VError(err, "Request failed");
}

module.exports = {
    handleError,
};
