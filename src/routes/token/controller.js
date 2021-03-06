const { UserModel } =  require("../../../models");
const { errorResponse, successResponse } =  require("../../../helpers")
const status = require("http-status");
const objectId = require("mongodb").ObjectId;

let result = {};

module.exports = {
    tokenVerify: async (req, res) => {
        try {
            const { userId } = req.params;
            const currentUser = await UserModel.findById(userId);

            if (!currentUser) {
                result.status = status.BAD_REQUEST;
                result.message = `User is not found!`;
                return errorResponse(req, res, result)
            }

            if (currentUser.is_active) {
                result.status = status.BAD_REQUEST;
                result.message = `User is already active!`;
                return errorResponse(req, res, result)
            }

            await UserModel.updateOne({ _id: objectId(userId) }, { $set: { is_active: true }});

            result = {
                data: {},
                message: `User successfully verified`
            }

            return successResponse(req, res, status.OK, result);
        } catch (error) {
            return errorHandle(req, res, error);
        }
    }
};

const errorHandle = (req, res, error) => {
    console.error("Error occured with message :", error);

    result.status = status.INTERNAL_SERVER_ERROR;
    result.message = error.message;
    return errorResponse(req, res, result);
};