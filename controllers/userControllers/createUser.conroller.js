const services = require("../../services");

module.exports = {
    async CreateUser(req, res) {
        try {
            let {
                Rating,
                Gender,
                Country,
                PhoneNumber,
                Languages,
                Education,
                Occupation,
                Hobbies,
                AboutMe,
                CountriesIvisited,
            } = req.body;
            let { id } = req.params;
            // console.log("req file path", req.file.path);
            const newUser = await services.userService.createUser.CreateUser(
                Rating,
                Gender,
                Country,
                PhoneNumber,
                Languages,
                Education,
                Occupation,
                Hobbies,
                AboutMe,
                CountriesIvisited,
                id
            );
            res.status(206).json({
                status: true,
                message: "Génial! One more step to finish ",
                newUser,
            });
        } catch (err) {
            res.status(500).json({ status: false, message: err });
            console.log(err);
        }
    },
};
