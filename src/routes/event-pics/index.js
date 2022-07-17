const router = require("express").Router();
const controller = require("./controller");
const { authenticationAdmin } = require("../../../middleware");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/event-pic",
    checkBody("full_name").isString().withMessage('full_name must be filled and type is string!'),
    checkBody("email").isString().withMessage('email must be filled and type is string!'), authenticationAdmin, controller.createEventPic);
router.put("/event-pic/:eventPicID",
    checkBody("full_name").isString().withMessage('full_name must be filled and type is string!'),
    checkBody("email").isString().withMessage('email must be filled and type is string!'), authenticationAdmin, controller.modifyEventPic);
router.get("/event-pic", authenticationAdmin, controller.findAllEventPic);
router.delete("/event-pic/:eventPicID/delete", authenticationAdmin, controller.deleteEventPic);

module.exports = router;