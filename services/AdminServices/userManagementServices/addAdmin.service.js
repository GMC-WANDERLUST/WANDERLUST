const User = require("../../../model/User");
module.exports = {
  async updateUserAdmin(body, id) {
    try {
      return await User.findOneAndUpdate(
        { user: id },
        { $set: { ...body } }
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
