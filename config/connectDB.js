const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = mongoose
    .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
module.exports = connectDB;
