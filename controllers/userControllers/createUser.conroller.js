const services = require("../../services");
const { InfosValidation } = require("../../config/validation");

module.exports = {
    async CreateUser(req, res) {
        let {
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
        const { error } = InfosValidation({ Country, PhoneNumber, Languages });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        try {
            const newUser = await services.userService.createUser.CreateUser(
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
