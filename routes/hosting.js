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
        let { city, nbreOfRooms, nbreOfBeds, price, available, description } =
            req.body;
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
            available,
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
router.put("/editHosting/:id", verify, UserAccess, async (req, res) => {
    try {
        let editHost = req.body;
        console.log(editHost)
        let id = req.header("data");
        await Hosting.findByIdAndUpdate(id, {
            $set: { ...editHost },
        });
        let editedHosting = await Hosting.findById(id);
        res.status(201).json({
            message: "Hosting offer was updated successfully",
            editedHosting,
        });
    } catch (err) {
        res.status(500).json({
            message: "Cannot find the Hosting offer ",
            err,
        });
    }
});

// SHOW HOSTING OFFER LIST by ID
router.get("/myHosting/:id", verify, UserAccess, async (req, res) => {
    try {
        let { id } = req.params;
        const hostingList = await Hosting.find({ host: id });
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
// SHOW HOST BY DATE

router.get(
    "/allHosts/filter/date/:id",
    verify,
    UserAccess,
    async (req, res) => {
        let dateData = req.header("data");
        let residenceData = req.header("residence");
        try {
            const HostsList = ([] = await Hosting.find({
                residence: residenceData.toLowerCase(),
                available: dateData,
            }));

            res.status(201).json({
                status: true,
                data: HostsList,
                message: "posts list",
                length: HostsList.length,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);

// REPORT HOST
router.put("/reportHost/:id", verify, UserAccess, async (req, res) => {
    try {
        let { id } = req.body;
        // console.log(id);
        await Hosting.findByIdAndUpdate(id, { isReported: 1 });
        let reportedHost = await Hosting.findById(id);
        res.status(201).json({
            status: true,
            message: "Host was reported!",
            reportedHost,
        });
    } catch (error) {
        res.status(401).json({ message: "data not found", error });
    }
});
// DELETE HOSTING
router.delete("/deleteHosting/:id", verify, UserAccess, async (req, res) => {
    let id = req.header("data");
    try {
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
