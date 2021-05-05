const router = require("express").Router();
const controller = require("./controller");

const { authAll } = require("../../../middleware");

router.get("/users", authAll.grantOnlyAdmin, controller.getAllUser);
router.get("/user/:id", authAll.grantAll, controller.getOneUser);
router.put(
  "/modify/user/:id",
  authAll.grantOnlyAdmin,
  controller.updateOneUser
);
router.delete(
  "/delete/user/:id",
  authAll.grantOnlyAdmin,
  controller.deleteOneUser
);

module.exports = router;
