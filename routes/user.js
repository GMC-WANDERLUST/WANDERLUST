const router = require("express").Router();
const { register, login } = require("../middlewares/auth");
const User = require("../model/User");
const UserInfos = require("../model/UserInfos");
const verify = require("../middlewares/verifyToken");
const userAccess = require("../middlewares/verifyUserAccess");
const bcrypt = require("bcryptjs");
const {
    NewPasswordValidation,
    NewEmailValidation,
} = require("../config/validation");

// REGISTER
router.post("/register", register);
// LOGIN
router.post("/login", login);

// EDIT FIRSTNAME
router.put("/editUserFirstName/:id", verify, userAccess, async (req, res) => {
    try {
        let { FirstName } = req.body;
        let { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $set: { FirstName },
        });
        let newFNameAndLName = await User.findById(id);
        await UserInfos.findOneAndUpdate(
            { user: id },
            {
                $set: {
                    FirstName: newFNameAndLName.FirstName,
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
});
// EDIT LASTNAME
router.put("/editUserLastName/:id", verify, userAccess, async (req, res) => {
    try {
        let { LastName } = req.body;
        let { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $set: { LastName },
        });
        let newFNameAndLName = await User.findById(id);
        await UserInfos.findOneAndUpdate(
            { user: id },
            {
                $set: {
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
});
// EDIT LOGIN PASSWORD
router.put("/editPassword/:id", verify, userAccess, async (req, res) => {
    try {
        let { oldPassword, newpassword } = req.body;
        let { id } = req.params;

        let user = await User.findById(id);

        const validPassword = await bcrypt.compare(oldPassword, user.password);
        const { error } = NewPasswordValidation(req.body);
        if (!validPassword) {
            res.status(401).json({
                status: false,
                message: "Please enter your Password again",
            });
        } else if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else {
            //  hash the new password
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newpassword, salt);

            await User.findByIdAndUpdate(id, {
                $set: { password: newHashedPassword },
            });

            let userUpdated = await User.findOne({
                password: newHashedPassword,
            });
            res.status(201).json({
                status: true,
                message: "Password was updated successfully",
                userUpdated,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT LOGIN EMAIL

router.put("/editEmail/:id", verify, userAccess, async (req, res) => {
    let { email } = req.body;
    let { id } = req.params;
    const { error } = NewEmailValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
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
