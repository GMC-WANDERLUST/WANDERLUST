const UserInfos = require("../../model/UserInfos");
// const Host = require("../../model/Hosting");
module.exports = {
    async UpdateUser(body, id) {
        try {
            return await UserInfos.findOneAndUpdate(
                { user: id },
                { $set: { ...body } }
            );
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
