const mongoose = require("mongoose");
// require("dotenv").config();
let url =
    "mongodb+srv://anouar1994:ca_19206656@cluster0.sywgc.mongodb.net/projectDB?retryWrites=true&w=majority";
const connectDB = mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
module.exports = connectDB;
