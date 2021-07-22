const UserInfos = require("../../model/UserInfos");
module.exports = {
    async UpdateUser(body, id) {
        try {
            return await UserInfos.findOneAndUpdate(
                { user: id },
                { $set: { ...body } }
            );
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
