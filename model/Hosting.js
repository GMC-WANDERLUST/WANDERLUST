const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostingSchema = new mongoose.Schema({
    host: {
        type: Schema.Types.ObjectId,
    },
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: true,
    },
    residence: {
        type: "string",
    },
    languages : {
        type : ["string"],
        required : true,
    },
    nbreOfRooms: {
        type: "number",
        required: true,
    },
    nbreOfBeds: {
        type: "number",
        required: true,
    },
    price: {
        type: "number",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    },
});

module.exports = Hosting = mongoose.model("hosting", hostingSchema);
