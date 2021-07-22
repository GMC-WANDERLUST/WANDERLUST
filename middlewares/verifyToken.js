const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function (req, res, next) {
    // console.log("headers", req.headers)
    const token = req.header("jwt");
    if (!token) return res.status(401).send("Access denied  now");
    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        // console.log(verified)
        req.token = token;
        next();
    } catch (err) {
        res.status(400).send("invalid token");
    }
};
