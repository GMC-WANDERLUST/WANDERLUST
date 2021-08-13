const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
        },
        firstName: {
            type: "string",
        },
        lastName: {
            type: "string",
        },
        img: {
            type: "string",
        },
        languages: {
            type: ["string"],
        },
        destination: {
            type: String,
            required: true,
        },
        city: {
            type: "String",
            require: true,
        },
        check_in: {
            type: "string",
            required: true,
        },
        check_out: {
            type: "string",
            required: true,
        },
        nbreOfGuests: {
            type: "string",
            required: true,
        },
        phone:{
            type:"string",
            required:true,
        },
        description: {
            type: "string",
            required: true,
        },
        isReported: {
            type: "number",
            default: 0,
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                },
            },
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                },
                text: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                lastName: {
                    type: String,
                },
                img: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamsp: true }
);

module.exports = Post = mongoose.model("post", PostSchema);
