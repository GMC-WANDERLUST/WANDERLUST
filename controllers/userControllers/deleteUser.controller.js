const services = require("../../services");
module.exports = {
    async DeleteUser(req, res) {
        try {
            let { id } = req.params;
            const DeleteUser = await services.userService.deleteUser.DeleteUser(
                id
            );
            res.status(201);
            res.json({
                status: true,
                message: "user was deleted successfully",
                data : DeleteUser,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
