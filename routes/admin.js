const router = require("express").Router();
const controller = require("../controllers/adminControllers");
const verify = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/Admin");
const User = require("../model/User");
const Posts = require("../model/Posts");
const Hosts = require("../model/Hosting");

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
//GET Reported Posts

router.get("/reportedPosts/:id", verify, verifyAdmin, async (req, res) => {
    let { id } = req.params;
    try {
        const reportedPosts = await Posts.find({isReported : 1});
        // console.log(reportedPosts);
        res.status(201).json({
            status: true,
            message: "reported Posts",
            data: reportedPosts,
        });
    } catch (error) {
        res.status(404).json({ status: true, error });
    }
});
//GET Reported Hosts

router.get("/reportedHosts/:id", verify, verifyAdmin, async (req, res) => {
    let { id } = req.params;
    try {
        const reportedHosts = await Hosts.find({isReported : 1});
        // console.log(reportedPosts);
        res.status(201).json({
            status: true,
            message: "reported Hosts",
            data: reportedHosts,
        });
    } catch (error) {
        res.status(404).json({ status: true, error });
    }
});

//GET All Hosts

router.get("/allHosts/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let hosts = await Hosts.find();
        res.status(201).json({ status: true, message: "all hosts", hosts });
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: false, message: "error", error });
    }
});

//GET One User
router.get(
    "/user/:id",
    verify,
    verifyAdmin,
    controller.userManagementController.getUsers.getUserById
);
// ADD Admin
router.put("/addAdmin/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        let newAdmin = await User.findByIdAndUpdate(id, {
            $set: { isAdmin: true },
        });
        res.status(201).json({
            message: "Admin was added successfully",
            newAdmin,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// REMOVE ADMIN
router.put("/removeAdmin/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        let newAdmin = await User.findByIdAndUpdate(id, {
            $set: { isAdmin: false },
        });
        res.status(201).json({
            message: "Admin was removed",
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
router.delete("/deletePost/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        let deletedPost = await Posts.findByIdAndRemove(id);
        res.status(201).json({
            message: "Post was deleted successfully",
            deletedPost,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});
// delete user host
router.delete("/deleteHost/:id", verify, verifyAdmin, async (req, res) => {
    try {
        let id = req.header("data");
        let deletedPost = await Hosts.findByIdAndRemove(id);
        res.status(201).json({
            message: "Host was deleted successfully",
            deletedPost,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

module.exports = router;
