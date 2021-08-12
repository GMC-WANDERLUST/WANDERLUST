const router = require("express").Router();
const controllers = require("../../controllers");
const verify = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");
const userAccess = require("../../middlewares/verifyUserAccess");
const User = require("../../model/User.js");
const UserInfos = require("../../model/UserInfos.js");

// Manage USER Profil
// router.get("/UserInfos", controllers.userControllers.read.ReadUser);
router.get(
    "/UserInfos/:id",
    verify,
    userAccess,
    controllers.userControllers.read.ReadUser
);
//Add User info
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
//update user photo
router.put(
    "/updateUserPhoto/:id",
    verify,
    userAccess,
    upload.single("photo"),
    controllers.userControllers.updatePhoto.UpdateUserPhoto
);
//RATE USER
router.put("/saveUserId/:id", verify, userAccess, async (req, res) => {
    try {
        let { id } = req.params;
        let randomId = req.header("data");
        await UserInfos.findOneAndUpdate(
            { user: randomId },
            {
                $push: { Ratings, id },
            }
        );
        let UpdatedUser = await UserInfos.findOne({ user: randomId });
        res.status(201).send({
            status: true,
            message: "user id added successfully",
            data: UpdatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: false, error });
    }
});
module.exports = router;
