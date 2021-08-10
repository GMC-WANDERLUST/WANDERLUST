const UserInfos = require("../../model/UserInfos");
const Posts = require("../../model/Posts");
const Host = require("../../model/Hosting");
const User = require("../../model/User")

module.exports = {
    async UpdateUserPhoto(req, res) {
        try {
            // let body = req.body;
            let { id } = req.params;
            // if (req.file) {
            //     photo = `${req.protocol}://${req.get("host")}/uploads/${
            //         req.file.filename
            //     }`;
            // }
            let photoUrl = `${req.protocol}://${req.get("host")}/uploads/${
                req.file.filename
            }`;
            await User.findByIdAndUpdate(
                id,
                { $set: { image: photoUrl } }
            );
            await UserInfos.findOneAndUpdate(
                { user: id },
                { $set: { photo: photoUrl } }
            );
            await Posts.updateMany(
                { user: id },
                { $set: { img: photoUrl } }
            );
            await Host.updateMany({ host: id }, { $set: { img: photoUrl } });
            let updatedUser = await UserInfos.find({ user: id });
            console.log("updated user",updatedUser);
            res.status(206).json({
                status: true,
                message: "Your profile photo was updated seccussfully",
                url: updatedUser.photo,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
