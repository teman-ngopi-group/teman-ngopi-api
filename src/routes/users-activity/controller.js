const { UserModel } = require("../../../models");
const { hashPassword, generateToken } = require("../../../helpers");

const objectId = require("mongodb").ObjectId;

let objErr = {};

module.exports = {
  userRegister: async (req, res) => {
    try {
      const hasPass = await hashPassword(req.body.password);
      const genToken = await generateToken(req.body);
      
      //Check if email already used
      const userCheckEmail = await UserModel.findOne({ email: req.body.email });

      if (userCheckEmail) {
        objErr.status = 400;
        objErr.message = `User with email ${req.body.email} already used`;
        return handleError(req, res, objErr);
      }

      //Continue registration process
      const userRegistration = await UserModel.create({
        ...req.body,
        password: hasPass,
        token: genToken,
      });

      const { _id, name, email } = userRegistration;

      res.status(201).json({
        status: 201,
        message: `User successfully created with id ${userRegistration._id}`,
        data: { _id, name, email },
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const result = await UserModel.find({})
        .select("-password -token")
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
      }).select("-password -token");

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
      const resultFind = await UserModel.find({
        _id: objectId(id),
      }).select("-password -token");

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
  deleteOneUser: async (req, res) => {
    const { id } = req.params;

    try {
      const resultFind = await UserModel.find({
        _id: objectId(id),
      }).select("-password -token");

      if (!resultFind) {
        objErr.status = 400;
        objErr.message = `User with id ${id} not found`;
        return handleError(req, res, objErr);
      }

      const result = await UserModel.deleteOne({ _id: objectId(id) });

      res.status(200).json({
        status: 200,
        message: `User succesfully delete with id ${id}`,
        dataDeleted: resultFind,
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
