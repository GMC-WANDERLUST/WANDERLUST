const User = require("../model/User");
// const User = require('../')
module.exports = async function (req, res, next) {
    // let isUser = req.user.user.isUser;
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        if (user.isHost) {
            // res.status(201).json({status: true, message:'Authorized'});
            next();
        } else {
            res.status(401).json({ status: false, message: "You are not a Host!" });
        }
    } catch (error) {
        res.status(401).json({ error });
        console.log(error);
    }
    // if (isUser) {
    //     next();
    // } else {
    //     res.status(401).json({ message: "Access denied" });
    // }
};
