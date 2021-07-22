const router = require("express").Router();
const Hosting = require("../model/Hosting");
const User = require("../model/User");
const UserInfos = require("../model/UserInfos");
const verify = require("../middlewares/verifyToken");

// ADDING NEW HOSTING AS A HOST
router.post("/newHosting/:id", verify, async (req, res) => {
    let { nbreOfRooms, nbreOfBeds, price, description } = req.body;
    let { id } = req.params;
    try {
        let host = req.user;
        // console.log(host.user.isHost);
        if (host.user.isHost) {
            const user = await User.findById(id);
            const userinfos = await UserInfos.findOne({ user: id });
            const hosting = new Hosting({
                host: user._id,
                firstName: user.FirstName,
                lastName: user.LastName,
                residence: userinfos.Country,
                languages: userinfos.Languages,
                nbreOfRooms,
                nbreOfBeds,
                price,
                description,
            });
            const newHosting = await hosting.save();
            res.status(201).json({
                message: "Hosting Post was added successfully",
                newHosting,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "You should be a Host",
            });
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

// UPDATING HOSTING
router.put("/editHosting/:id", verify, async (req, res) => {
    let body = req.body;
    let { id } = req.params;
    try {
        let host = req.user;
        if (host.user.isHost) {
            let editedHosting = await Hosting.findByIdAndUpdate(id, {
                $set: { ...body },
            });
            res.status(201).json({
                message: "Hosting offer was updated successfully",
                editedHosting,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "You should be a Host",
            });
        }
    } catch (err) {
        res.status(500).send('Cant" \'t " find the Hosting offer ', err);
    }
});

// SHOW HOSTING OFFER LIST
router.get("/allHosting", verify, async (req, res) => {
    try {
        const hostingList = await Hosting.find();
        res.status(201).json({
            status: true,
            message: "hosting list",
            data: hostingList,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});
// SHOW Hosting POSTS BY RESIDENCE

router.get("/allHosting/:residence", verify, async (req, res) => {
    try {
        let { residence } = req.params;
        const hostingList = await Hosting.find({ residence });
        console.log(hostingList);
        res.status(201).json({
            status: true,
            message: "hosting list",
            data: hostingList,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});
// DELETE HOSTING
router.delete("/deleteHosting/:id", verify, async (req, res) => {
    let { id } = req.params;
    try {
        let host = req.user;
        if (host.user.isHost) {
            let deletedHosting = await Hosting.findByIdAndRemove(id);
            res.status(201).json({
                message: "Hosting Post was deleted successfully",
                deletedHosting,
            });
        } else {
            res.status(401).json({
                status: false,
                message: "You should be a Host",
            });
        }
    } catch (err) {
        res.send(500).send(err);
        console.log(err);
    }
});
module.exports = router;
