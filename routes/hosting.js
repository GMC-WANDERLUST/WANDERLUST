const router = require("express").Router();
const Hosting = require("../model/Hosting");
const User = require("../model/User");
const UserInfos = require("../model/UserInfos");
const verify = require("../middlewares/verifyToken");
const HostAccess = require("../middlewares/HostAccess");
const UserAccess = require("../middlewares/verifyUserAccess");

// ADDING NEW HOSTING AS A HOST
router.post("/newHosting/:id", verify, async (req, res) => {
    try {
        let { city, nbreOfRooms, nbreOfBeds, price, description } = req.body;
        let { id } = req.params;
        const user = await User.findById(id);
        const userinfos = await UserInfos.findOne({ user: id });
        const hosting = new Hosting({
            host: user._id,
            firstName: user.FirstName,
            lastName: user.LastName,
            img: userinfos.photo,
            residence: userinfos.Country.toLowerCase(),
            city: city.toLowerCase(),
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
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

// UPDATING HOSTING
router.put("/editHosting/:id", verify, HostAccess, async (req, res) => {
    let body = req.body;
    let { id } = req.params;
    try {
        let editedHosting = await Hosting.findByIdAndUpdate(id, {
            $set: { ...body },
        });
        res.status(201).json({
            message: "Hosting offer was updated successfully",
            editedHosting,
        });
    } catch (err) {
        res.status(500).send('Cant" \'t " find the Hosting offer ', err);
    }
});

// SHOW HOSTING OFFER LIST by ID
router.get("/myHosting/:id", verify, UserAccess, async (req, res) => {
    try {
        let { id } = req.params;
        const hostingList = await Hosting.find({host : id});
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

router.get(
    "/allHosting/residence/:id",
    verify,
    UserAccess,
    async (req, res) => {
        let residenceData = req.header("data");
        try {
            const hostingList = ([] = await Hosting.find({
                residence: residenceData.toLowerCase(),
            }));
            // console.log(hostingList);
            res.status(201).json({
                status: true,
                message: "hosting list",
                data: hostingList,
                length: hostingList.length,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);
// SHOW HOSTING BY CITY
router.get(
    "/allHosting/residence/city/:id",
    verify,
    UserAccess,
    async (req, res) => {
        let cityData = req.header("data");
        try {
            const hostingList = ([] = await Hosting.find({
                city: cityData.toLowerCase(),
            }));

            res.status(201).json({
                status: true,
                data: hostingList,
                message: "posts list",
                length: hostingList.length,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);
// DELETE HOSTING
router.delete("/deleteHosting/:id", verify, HostAccess, async (req, res) => {
    let { id } = req.params;
    try {
        let host = req.user;

        let deletedHosting = await Hosting.findByIdAndRemove(id);
        res.status(201).json({
            message: "Hosting Post was deleted successfully",
            deletedHosting,
        });
    } catch (err) {
        res.send(500).send(err);
        console.log(err);
    }
});
module.exports = router;
