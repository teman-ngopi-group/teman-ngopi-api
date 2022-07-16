const router = require("express").Router();
const controller = require("./controller");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/users/login", 
    [
        checkBody("email").isString().withMessage('email must be filled and type is string!'), 
        checkBody("password").isString().withMessage('password must be filled and type is string!')
    ], controller.userLogin);
router.post("/users/register",
    [
        checkBody("full_name").isString().withMessage('full_name must be filled and type is string!'),
        checkBody("gender").isString().withMessage('gender must be filled and type is string!'),
        checkBody("email").isString().withMessage('email must be filled and type is string!'),
        checkBody("password").isString().withMessage('password must be filled and type is string!')
    ], controller.userRegister);
router.post("/admin/login",
    [
        checkBody("email").isString().withMessage('email must be filled and type is string!'),
        checkBody("password").isString().withMessage('password must be filled and type is string!')
    ], controller.userLogin);
router.post("/admin/register",
    [
        checkBody("email").isString().withMessage('email must be filled and type is string!'), 
        checkBody("password").isString().withMessage('password must be filled and type is string!')
    ], controller.userRegister);

module.exports = router;
