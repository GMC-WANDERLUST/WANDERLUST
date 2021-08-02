const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const User = require("../model/User");
const UserInfos = require("../model/UserInfos");
const Posts = require("../model/Posts");
const verifyUserAccess = require("../middlewares/verifyUserAccess");
// ADD NEW POST
router.post("/addnewpost/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let {
            destination,
            city,
            check_in,
            check_out,
            nbreOfGuests,
            description,
        } = req.body;
        let { id } = req.params;
        const user = await User.findById(id);
        const userInfos = await UserInfos.findOne({ user: id });
        const newPost = new Posts({
            user: user.id,
            firstName: user.FirstName,
            lastName: user.LastName,
            img: userInfos.photo,
            languages: userInfos.Languages,
            destination: destination.toLowerCase(),
            city: city.toLowerCase(),
            check_in,
            check_out,
            nbreOfGuests,
            description,
        });
        const post = await newPost.save();
        res.status(201).json({
            message: "YOUR POST WAS ADDED SUCCESSFULLY",
            post,
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// UPDATE POST
router.put("/editPost/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let { editPost, _id } = req.body;
        await Posts.findByIdAndUpdate(_id, {
            $set: { ...editPost },
        });
        let editedPost = await Posts.findById(_id);
        console.log(editedPost);
        res.status(201).json({
            message: "Post was updated successfully",
            editedPost,
        });
    } catch (err) {
        res.status(500).json({message: 'Cannot find the post ', err});
    }
});

// SHOW THE POSTS LIST
router.get("/allPosts", verify, verifyUserAccess, async (req, res) => {
    try {
        const postsList = await Posts.find();
        res.status(201).json({
            status: true,
            message: "posts list",
            data: postsList,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

// SHOW POST BY ID

router.get("/myPosts/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let { id } = req.params;
        const postsList = await Posts.find({ user: id });
        res.status(201).json({
            status: true,
            message: "Your Post list",
            data: postsList,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});
// SHOW POST BY DESTINATION

router.get(
    "/allPosts/destination/:id",
    verify,
    verifyUserAccess,
    async (req, res) => {
        let destinationData = req.header("data");
        try {
            const PostsList = [] = await Posts.find({
                destination: destinationData.toLowerCase(),
            });

            // console.log(typeof PostsList.length)

            res.status(201).json({
                status: true,
                data: PostsList,
                message: "posts list",
                length: PostsList.length,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);
// SHOW POST BY CITY

router.get(
    "/allPosts/destination/city/:id",
    verify,
    verifyUserAccess,
    async (req, res) => {
        let cityData = req.header("data");
        try {
            const PostsList = ([] = await Posts.find({
                city: cityData.toLowerCase(),
            }));

            res.status(201).json({
                status: true,
                data: PostsList,
                message: "posts list",
                length: PostsList.length,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);

// REPORT POST
router.put("/reportPost/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let { id } = req.body;
        console.log(id);
        await Posts.findByIdAndUpdate(id, { isReported: 1 });
        let reportedPost = await Posts.findById(id);
        res.status(201).json({
            status: true,
            message: "Post was reported!",
            reportedPost,
        });
    } catch (error) {
        res.status(401).json({ message: "data not found", error });
    }
});
// DELETE POST
router.delete("/deletePost/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let _id = req.header("_id");
        let deletedPost = await Posts.findByIdAndRemove(_id);
        res.status(201).json({
            message: "Post was deleted successfully",
            deletedPost,
        });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

module.exports = router;
