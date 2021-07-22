const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const User = require("../model/User");
const Posts = require("../model/Posts");
const verifyUserAccess = require("../middlewares/verifyUserAccess");
// ADD NEW POST
router.post("/addnewpost/:id", verify, verifyUserAccess, async (req, res) => {
    let { destination, check_in, check_out, nbreOfGuests, description } =
        req.body;
    let { id } = req.params;
    try {
        const user = await User.findById(id);
        const newPost = new Posts({
            user: user.id,
            firstName: user.FirstName,
            lastName: user.LastName,
            destination,
            check_in,
            check_out,
            nbreOfGuests,
            description,
        });
        const post = await newPost.save();
        res.status(201).json({
            message: "post was added successfully",
            post,
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// UPDATE POST
router.put("/editPost/:id", verify, verifyUserAccess, async (req, res) => {
    try {
        let body = req.body;
        let { id } = req.params;
        let editedPost = await Posts.findByIdAndUpdate(id, {
            $set: { ...body },
        });
        res.status(201).json({
            message: "Post was updated successfully",
            editedPost,
        });
    } catch (err) {
        res.status(500).send('Cant" \'t " find the post ', err);
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

// SHOW POST BY DESTINATION

router.get(
    "/allPosts/:destination",
    verify,
    verifyUserAccess,
    async (req, res) => {
        try {
            let { destination } = req.params;
            const postsList = await Posts.find({ destination });
            res.status(201).json({
                status: true,
                message: "posts list",
                data: postsList,
            });
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
);

// DELETE POST
router.delete("/deletePost/:id", verify, verifyUserAccess, async (req, res) => {
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
