const router = require("express").Router();
const controller = require("./controller");
const { buildCheckFunction } = require("express-validator");

const checkBody = buildCheckFunction(['body']);

router.post("/event-type",
    checkBody("name").isString().withMessage('name must be filled and type is string!'), controller.createEventType);
router.put("/event-type/:eventTypeID",
    checkBody("name").isString().withMessage('name must be filled and type is string!'), controller.modifyEventType);
router.get("/event-type", controller.findAllEventType);
router.delete("/event-type/:eventTypeID/delete", controller.deleteEventType);

module.exports = router;