const VError = require("verror");

function extractReponseError(err) {
    try {
        return err.response.data.error.message;
    } catch (err2) {
        return null;
    }
}

function handleError(err) {
    const extError = extractReponseError(err);
    if (extError) {
        throw new VError(err, `Request failed: ${extError}`);
    }
    throw new VError(err, "Request failed");
}

function handleResponse(response) {
    if (!response.status || response.status < 200 || response.status >= 300) {
        throw new Error(`Invalid response: ${response.status} ${response.statusText}`);
    }
    return response;
}

module.exports = {
    handleError,
    handleResponse
};
