const router = require("express").Router();
const controller = require("./controller");

router.post("/activate/:userId", controller.tokenVerify);

module.exports = router;