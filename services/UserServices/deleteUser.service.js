const UserInfos = require("../../model/UserInfos");
module.exports = {
    async DeleteUser(id) {
        try {
            return await UserInfos.findByIdAndRemove(id);
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
