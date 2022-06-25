const router = require("express").Router();
const controller = require("./controller");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/users/login", 
    [checkBody("email").isString(), checkBody("password").isString()], controller.userLogin);
router.post("/users/register",
    [checkBody("full_name").isString(), checkBody("gender").isString(), checkBody("email").isString(), checkBody("password").isString()], controller.userRegister);
router.post("/admin/login",
    [checkBody("email").isString(), checkBody("password").isString()], controller.userLogin);
router.post("/admin/register",
    [checkBody("email").isString(), checkBody("password").isString()], controller.userRegister);

module.exports = router;
