const User = require("../../../model/User");
const Posts =require("../../../model/Posts")

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
  async getPostsList() {
    try {
      return await Posts.find();
    } catch (err) {
      console.log(err);
    }
  },
};
