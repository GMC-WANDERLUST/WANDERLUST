const UserInfos = require("../../model/UserInfos");

module.exports = {
    async GetUser() {
        try {
            return await UserInfos.find();
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
