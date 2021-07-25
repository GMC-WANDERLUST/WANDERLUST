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
    img: {
        type:"string"
    },
    residence: {
        type: "string",
    },
    languages : {
        type : ["string"],
        required : true,
    },
    nbreOfRooms: {
        type: "string",
        required: true,
    },
    nbreOfBeds: {
        type: "string",
        required: true,
    },
    price: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    },
});

module.exports = Hosting = mongoose.model("hosting", hostingSchema);
