// const User = require('../')
module.exports = function (req, res, next) {
    let isUser = req.user.user.isUser;
    console.log("isUser",isUser)
    if (isUser) {
        next();
    } else {
        res.status(401).json({ message: "Access denied" });
    }
};
