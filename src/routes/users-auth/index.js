const router = require("express").Router();
const controller = require("./controller");

router.post("/users/register", controller.userRegister);
router.post("/users/login", controller.userLogin);

module.exports = router;
