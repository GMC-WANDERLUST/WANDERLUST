//Admin Access

module.exports = function (req, res, next) {
  let isAdmin = req.user.user.isAdmin;
  if (isAdmin) {
    //res.status(200).json({ status: true, msg: "access granted !" });
    next();
  } else {
    res.status(403).json({ status: false, msg: "access denied !" });
  }
};
