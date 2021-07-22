const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const path = require("path");
const upload = require("./middlewares/upload");
require("dotenv").config();
// Middlewares
app.use(express.json());

// Connect to database
connectDB;
// Routes Middlewares

// Register or Login User
app.use("/api/user", require("./routes/user"));

// Manage user profil
app.use("/api/profile", require("./routes/api"));
// Manage POSTS
app.use("/api/posts", require("./routes/posts"));
// Manage Hosting
app.use("/api/host", require("./routes/hosting"));

// Upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.post("/upload", upload, (req, res) => {
//     res.send("image uploaded successfully");
// });
// // Mange Image folder
// app.use("/images", express.static(path.join(__dirname, "images")));

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server up and Running");
});
