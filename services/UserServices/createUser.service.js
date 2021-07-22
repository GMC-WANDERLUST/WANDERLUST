const UserInfos = require("../../model/UserInfos");
const User = require("../../model/User");
module.exports = {
    async CreateUser(
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
    ) {
        try {
            const user = await User.findById(id);
            // const date = new Date.now;
            // const currentYear = date.getFullYear();
            // console.log(currentYear);
            var d = new Date();
            var currentYear = d.getFullYear();

            return await UserInfos.create({
                user: user._id,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Rating,
                DayOfBirth: user.DayOfBirth,
                MonthOfBirth: user.MonthOfBirth,
                YearOfBirth: user.YearOfBirth,
                Age: currentYear - parseInt(user.YearOfBirth),
                Gender,
                Country,
                PhoneNumber,
                Languages,
                Education,
                Occupation,
                Hobbies,
                AboutMe,
                CountriesIvisited,
            });
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
