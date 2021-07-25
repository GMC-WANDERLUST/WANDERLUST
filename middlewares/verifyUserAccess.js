const User = require('../model/User')
// const User = require('../')
module.exports = async function (req, res, next) {
    // let isUser = req.user.user.isUser;
    try {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log("USER",User)
    console.log(user)
    if (user.isUser) {
        // res.status(201).json({status: true, message:'Authorized'});
        next();
    } else {
        res.status(401).json({status: false, message :"Access Denied"})
    }

    } catch (error) {
        res.status(401).json({error});
        console.log(error)
    }
};
