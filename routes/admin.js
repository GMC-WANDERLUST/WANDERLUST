const router = require("express").Router();
const controller = require("../controllers/adminControllers");
const verify = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/Admin");

//GET User List
router.get(
  "/userList",
  verify,
  verifyAdmin,
  controller.userManagementController.getUsers.getUserList
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
    let { id } = req.params;
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
router.put("/bannedUser/:id", verify, verifyAdmin, async (req, res) => {
  try {
    let { isUser } = req.body;
    let { id } = req.params;
    let bannedUser = await User.findByIdAndUpdate(id, {
      $set: { isUser },
    });
    res.status(201).json({
      message: "User was Updated successfully",
      bannedUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
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
