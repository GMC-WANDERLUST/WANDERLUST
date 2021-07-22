const router = require("express").Router();
const { register, login } = require("../middlewares/auth");
const User = require("../model/User");
const UserInfos = require("../model/UserInfos");
const verify = require("../middlewares/verifyToken");
const userAccess = require("../middlewares/verifyUserAccess");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// EDIT FIRSTNAME AND LASTNAME
router.put(
    "/editUserFirstName&LastName/:id",
    verify,
    userAccess,
    async (req, res) => {
        try {
            let { FirstName, LastName } = req.body;
            let { id } = req.params;
            await User.findByIdAndUpdate(id, {
                $set: { FirstName, LastName },
            });
            let newFNameAndLName = await User.findById(id);
            await UserInfos.findOneAndUpdate(
                { user: id },
                {
                    $set: {
                        FirstName: newFNameAndLName.FirstName,
                        LastName: newFNameAndLName.LastName,
                    },
                }
            );
            res.status(201).json({
                message: "Updated successfully",
                newFNameAndLName,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);
// EDIT LOGIN PASSWORD
router.put("/editPassword/:id", verify, userAccess, async (req, res) => {
    try {
        let { password } = req.body;
        let { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $set: { password },
        });
        let newPassword = await User.findById(id);
        res.status(201).json({
            message: "Password was updated successfully",
            newPassword,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// EDIT LOGIN EMAIL

router.put("/editEmail/:id", verify, userAccess, async (req, res) => {
    try {
        let { email } = req.body;
        let { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $set: { email },
        });
        let newEmail = await User.findById(id);
        res.status(201).json({
            message: "Email was updated successfully",
            newEmail,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// SWITCH TO HOST
router.put("/editStatus/:id", verify, userAccess, async (req, res) => {
    try {
        let { isHost } = req.body;
        let { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $set: { isHost },
        });
        let newLoginInformation = await User.findById(id);
        res.status(201).json({
            message: "GREAT! ENJOY! ",
            newLoginInformation,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
