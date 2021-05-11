const router = require("express").Router();
const controller = require("./controller");

const { authAll } = require("../../../middleware");

router.post("/test/admin", controller.userTestRegister);
router.get("/users", authAll.grantOnlyAdmin, controller.getAllUser);
router.get("/user/:id", authAll.grantAll, controller.getOneUser);
router.post("/add/user", authAll.grantOnlyAdmin, controller.userRegister);
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
