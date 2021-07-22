const userManagementService = require("../../../services/AdminServices/userManagementServices");

module.exports = {
  async getUserList(req, res) {
    try {
      const userList =
        await userManagementService.getUserServices.getUserList();
      res
        .status(200)
        .json({ status: true, msg: "userList found", data: userList });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, msg: err });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userManagementService.getUserServices.getUserById(id);
      if (user) {
        res.status(200).json({ status: true, msg: "user found !", data: user });
      }
      res.status(404).json({ status: false, msg: "user not found!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, msg: err });
    }
  },
};
