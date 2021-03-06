const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FirstName: {
        type: "string",
        required: true,
    },
    LastName: {
        type: "string",
        required: true,
    },
    image: {
        type: "string",
        default: "/uploads/user.png",
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
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    password: {
        type: "string",
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isHost: {
        type: Boolean,
        default: false,
    },
    isUser: {
        type: Boolean,
        default: true,
    },
    isReported: {
        type: "number",
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model("user", userSchema);
