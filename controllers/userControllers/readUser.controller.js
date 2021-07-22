const services = require("../../services");
const UserInfos = require("../../model/UserInfos");
module.exports = {
    async ReadUser(req, res) {
        let { id } = req.params;
        try {
            const usersInfos = await UserInfos.findOne({ user: id });
            console.log(usersInfos);
            res.status(200).json({
                status: true,
                message: "users",
                data: usersInfos,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
