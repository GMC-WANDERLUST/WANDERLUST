const router = require("express").Router();
const controllers = require("../../controllers");
const verify = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");
const userAccess = require("../../middlewares/verifyUserAccess");

// Manage USER Profil
// router.get("/UserInfos", controllers.userControllers.read.ReadUser);
router.get(
    "/UserInfos/:id", verify,
    controllers.userControllers.read.ReadUser
);
router.post(
    "/addUserInfos/:id",
    verify,
    userAccess,
    controllers.userControllers.create.CreateUser
);
// router.delete("/deleteUserInfos/:id", controllers.userControllers.delete.DeleteUser);
router.put(
    "/updateUserInfos/:id",
    verify,
    userAccess,
    controllers.userControllers.update.UpdateUser
);
router.put(
    "/updateUserPhoto/:id",
    verify,
    userAccess,
    upload.single("photo"),
    controllers.userControllers.updatePhoto.UpdateUserPhoto
);

module.exports = router;
