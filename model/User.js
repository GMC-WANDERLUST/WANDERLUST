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
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model("user", userSchema);
