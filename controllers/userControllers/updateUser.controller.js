const services = require("../../services");
const UserInfos = require("../../model/UserInfos");
const User = require("../../model/User");
const Post = require("../../model/Posts");
const Host = require("../../model/Hosting");

module.exports = {
    async UpdateUser(req, res) {
        try {
            let body = req.body;
            let { id } = req.params;
            // let userData = await User.findById(id);
            // console.log(userData);
            await UserInfos.findOneAndUpdate(
                { user: id },
                { $set: { ...body } }
            );
            await Post.updateMany({ user: id }, { $set: { ...body } });
            await Host.updateMany({ user: id }, { $set: { ...body } });
            let updatedUser = await UserInfos.findOne({ user: id });
            res.status(206);
            res.json({
                status: true,
                message: "user was updated seccussfully",
                data: updatedUser,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
