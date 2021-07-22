const User = require("../../../model/User");

module.exports = {
  async getUserList() {
    try {
      return await User.find();
    } catch (err) {
      console.log(err);
    }
  },

  async getUserById(id) {
    try {
      return await User.findById({ id });
    } catch (err) {
      console.log(err);
    }
  },
};
