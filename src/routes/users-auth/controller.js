const { UserModel } = require("../../../models");
const { comparedPassword } = require("../../../helpers");

let objErr = {};

module.exports = {
  userLogin: async (req, res) => {
    try {
      await UserModel.findOne({
        email: req.body.email,
      }).then(async (user) => {
        if (!user) {
          objErr.status = 404;
          objErr.message = `User with email ${req.body.email} not found`;
          return handleError(req, res, objErr);
        }

        const comparePass = await comparedPassword(
          req.body.password,
          user.password
        );

        if (!comparePass) {
          objErr.status = 401;
          objErr.message = "The password that entered was incorrect";
          return handleError(req, res, objErr);
        }

        //Successfully validation
        const { name, email, token } = user;

        return res.status(200).json({
          status: 200,
          message: "Login succesfully",
          data: { name, email, token },
        });
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
