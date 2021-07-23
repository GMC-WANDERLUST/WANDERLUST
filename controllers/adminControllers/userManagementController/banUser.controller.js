const addAdminServices = require("../../../services/AdminServices/userManagementServices");

module.exports = {
  async updateAdminUser(req, res) {
    try {
      const newAdmin =
        await addAdminServices.addAdminServices.updateUserAdmin();
      res
        .status(200)
        .json({
          status: true,
          msg: "User Admin Updated Successfully",
          data: newAdmin,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, msg: err });
    }
  },
};
