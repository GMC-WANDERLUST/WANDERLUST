const services = require("../../services");
module.exports = {
    async UpdateUser(req, res) {
        try {
            let  body  = req.body;
            let { id } = req.params;
            const updatedUser =
                await services.userService.updateUser.UpdateUser(body, id);
            res.status(206);
            res.json({
                status: true,
                message: "user was updated seccussfully",
                data: updatedUser,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
