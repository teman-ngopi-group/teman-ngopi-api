const { UserModel } = require("../../../models");
const objectId = require("mongodb").ObjectId;

let objErr = {};

module.exports = {
  getAllUser: async (req, res) => {
    try {      
      const result = await UserModel.find({})
        .select("-password")
        .sort({ created_at: -1 });

      res.status(200).json({
        status: 200,
        message: "Show all registrant data",
        data: result,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  getOneUser: async (req, res) => {
    try {
      const result = await UserModel.find({
        _id: objectId(req.params.id),
      }).select("-password");

      res.status(200).json({
        status: 200,
        message: `Show specific user by id ${req.params.id}`,
        data: result,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  updateOneUser: async (req, res) => {
    const { id } = req.params;

    try {
      //Mengupdate user dengan dengan mencari user by _id dahulu
      const resultFind = await UserModel.find({
        _id: objectId(id),
      }).select("-password");

      if (!resultFind) {
        objErr.status = 400;
        objErr.message = `User with id ${id} not found`;
        return handleError(req, res, objErr);
      }

      const result = await UserModel.updateOne(
        { _id: objectId(id) },
        {
          $set: req.body,
        },
        { validateBeforeSave: false }
      );

      res.status(200).json({
        status: 200,
        message: `User succesfully update with id ${id}`,
        data: resultFind,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
};

const handleError = (req, res, objErr) => {
  let timestamp = new Date();

  res
    .status(objErr.status)
    .json({
      timestamp: timestamp,
      status: objErr.status,
      message: objErr.message,
      path: req.originalUrl,
    })
    .end();
};
