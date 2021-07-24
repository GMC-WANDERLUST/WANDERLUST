//Admin Access
const User = require("../model/User");

module.exports = async function (req, res, next) {
 try {
     let { id } = req.params;
     let user = await User.findById(id);
     if (user.isAdmin) {
         // res.status(201).json({status: true, message:'Authorized'});
         next();
     } else {
         res.status(401).json({ status: false, message: "Access Denied" });
     }
 } catch (error) {
     res.status(401).json({ error });
     console.log(error);
 }
  // let isAdmin = req.user.user.isAdmin;
  // if (isAdmin) {
  //   //res.status(200).json({ status: true, msg: "access granted !" });
  //   next();
  // } else {
  //   res.status(403).json({ status: false, msg: "access denied !" });
  // }
};
