const router = require("express").Router();
const controller = require("../controllers/adminControllers");
const verify =require("../middlewares/verifyToken")
const verifyAdmin =require("../middlewares/Admin")
router.get(
  "/userList",
  verify,
  verifyAdmin,
  controller.userManagementController.getUsers.getUserList
);
router.get(
  "/user/:id",
   verify,
  verifyAdmin,
  controller.userManagementController.getUsers.getUserById
);

module.exports = router;
