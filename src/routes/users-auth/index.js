const router = require("express").Router();
const controller = require("./controller");

router.post("/users/login", controller.userLogin);

module.exports = router;
