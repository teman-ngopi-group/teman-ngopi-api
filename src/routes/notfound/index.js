const { errorResponse } = require("../../../helpers");
const status = require("http-status");

const notfound = (req, res) => {
    const objError = {
        status: status.NOT_FOUND,
        message: "Route not found"
    }

    return errorResponse(req, res, objError);
}

module.exports = notfound;