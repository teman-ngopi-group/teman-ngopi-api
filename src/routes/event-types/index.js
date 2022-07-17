const router = require("express").Router();
const controller = require("./controller");
const { authenticationAdmin } = require("../../../middleware");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/event-type",
    checkBody("name").isString().withMessage('name must be filled and type is string!'), authenticationAdmin, controller.createEventType);
router.put("/event-type/:eventTypeID",
    checkBody("name").isString().withMessage('name must be filled and type is string!'), authenticationAdmin, controller.modifyEventType);
router.get("/event-type", authenticationAdmin, controller.findAllEventType);
router.delete("/event-type/:eventTypeID/delete", authenticationAdmin, controller.deleteEventType);

module.exports = router;