const router = require("express").Router();
const controller = require("../controllers/adminControllers");
const verify = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/Admin");
const User = require("../model/User");

//GET Users List
router.get(
    "/usersList/:id",
    verify,
    verifyAdmin,
    controller.userManagementController.getUsers.getUserList
);
//GET All Posts

router.get(
    "/allPosts/:id",
    verify,
    verifyAdmin,
    controller.userManagementController.getUsers.getPostsList
);

//GET One User
router.get(
    "/user/:id",
    verify,
    verifyAdmin,
    controller.userManagementController.getUsers.getUserById
);
// UPDATE User Admin
router.put("/addAdmin/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let { isAdmin } = req.body;

        let id = req.header("data");

        let newAdmin = await User.findByIdAndUpdate(id, {
            $set: { isAdmin },
        });

        res.status(201).json({
            message: "Admin was added successfully",
            newAdmin,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// ban user
router.put("/bannedUser/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        // let { id } = req.params;
        let bannedUser = await User.findByIdAndUpdate(id, {
            $set: { isUser: false },
        });
        res.status(201).json({
            message: "User was banned",
            bannedUser,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// unban user
router.put("/unbanedUser/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        // let { id } = req.params;
        let unbannedUser = await User.findByIdAndUpdate(id, {
            $set: { isUser: true },
        });
        res.status(201).json({
            message: "User was unbanned successfully",
            unbannedUser,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// delete user post
router.delete("/deleteUserPost/:id", verify, verifyAdmin, async (req, res) => {
    let { id } = req.params;
    try {
        let deletedPost = await Posts.findByIdAndRemove(id);
        res.status(201).json({
            message: "Post was deleted successfully",
            deletedPost,
        });
    } catch (err) {
        res.send(500).send(err);
        console.log(err);
    }
});

module.exports = router;
