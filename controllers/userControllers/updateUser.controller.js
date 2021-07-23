const services = require("../../services");
const UserInfos = require("../../model/UserInfos");
const User = require('../../model/User')

module.exports = {
    async UpdateUser(req, res) {
        try {
            let body = req.body;
            let { id } = req.params;
            // let userData = await User.findById(id);
            // console.log(userData);
            await services.userService.updateUser.UpdateUser(body, id);
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
