const router = require("express").Router();
const { register, login } = require("../middlewares/auth");
const User = require("../model/User");
const verify = require("../middlewares/verifyToken");
const userAccess = require('../middlewares/verifyUserAccess')

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// EDIT LOGIN PASSWORD
router.put("/editPassword/:id", verify, userAccess, async (req, res) => {
    try {
        let { password } = req.body;
        let { id } = req.params;
        let newLoginInformation = await User.findByIdAndUpdate(id, {
            $set: { password },
        });
        res.status(201).json({
            message: "login informations were updated successfully",
            newLoginInformation,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// EDIT LOGIN EMAIL

router.put("/editEmail/:id", verify,userAccess, async (req, res) => {
    try {
        let { email } = req.body;
        let { id } = req.params;
        let newLoginInformation = await User.findByIdAndUpdate(id, {
            $set: { email },
        });
        res.status(201).json({
            message: "login informations were updated successfully",
            newLoginInformation,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// SWITCH TO HOST
router.put("/editStatus/:id", verify,userAccess, async (req, res) => {
    try {
        let { isHost } = req.body;
        let { id } = req.params;
        let newLoginInformation = await User.findByIdAndUpdate(id, {
            $set: { isHost },
        });
        res.status(201).json({
            message: "login informations were updated successfully",
            newLoginInformation,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
