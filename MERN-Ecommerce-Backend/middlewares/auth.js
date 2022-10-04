const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    res.user = firebaseUser;
    console.log("Firebase user in object", firebaseUser);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or Expired token",
    });
  }
  next();
};

exports.adminCheck = async (req, res, next) => {
  const { email } = res.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
