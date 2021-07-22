const UserInfos = require("../../model/UserInfos");
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
            await UserInfos.findOneAndUpdate(
                { user: id },
                { $set: { photo: photoUrl } }
            );
            const updatedUser = await UserInfos.findOne({ user: id });
            console.log(updatedUser);
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
