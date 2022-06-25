const { TokenModel } =  require("../../../models");
const status = require("http-status");

let result = {};

module.exports = {
    tokenCreate: async (req, res) => {
        try {
            
        } catch (error) {
            return errorHandle(error);
        }
    }
};

const errorHandle = (error) => {
    console.error("Error occured with message :", error);

    result.status = status.INTERNAL_SERVER_ERROR;
    result.message = error.message;
    return errorResponse(req, res, result);
};