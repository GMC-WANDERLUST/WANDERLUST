const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        photo:{
            type:"string"
        },
        email: {
            type: "string",
            required: true,
        },
        message: {
            type: "string",
            // default: ["Hello"],
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamsp: true }
);

module.exports = Messages = mongoose.model("message", MessagesSchema);
