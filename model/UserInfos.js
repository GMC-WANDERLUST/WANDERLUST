const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfosSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
        },
        FirstName: {
            type: "string",
            required: true,
        },
        LastName: {
            type: "string",
            required: true,
        },
        photo: {
            type: "string",
            default: "/uploads/user.png",
        },
        Rating: {
            type: "string",
        },
        DayOfBirth: {
            type: "string",
            required: true,
        },
        MonthOfBirth: {
            type: "string",
            required: true,
        },
        YearOfBirth: {
            type: "string",
            required: true,
        },
        Age: {
            type: "number",
        },
        Gender: {
            type: "string",
        },
        Country: {
            type: "string",
        },
        PhoneNumber: {
            type: "string",
        },
        Languages: ["string"],
        Education: ["string"],
        Occupation: "string",
        Hobbies: ["string"],
        AboutMe: "string",
        CountriesIvisited: ["string"],
        date: {
            type: Date,
            dafault: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = UserInfos = mongoose.model("userinfo", userInfosSchema);
