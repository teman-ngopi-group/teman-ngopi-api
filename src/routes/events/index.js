const router = require("express").Router();
const controller = require("./controller");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/event-pic",
    checkBody("full_name").isString(),
    checkBody("email").isString(), controller.createEventPic);
router.put("/event-pic/:eventPicID",
    checkBody("full_name").isString(),
    checkBody("email").isString(), controller.modifyEventPic);
router.get("/event-pic", controller.findAllEventPic);
router.delete("/event-pic/:eventPicID/delete", controller.deleteEventPic);

module.exports = router;