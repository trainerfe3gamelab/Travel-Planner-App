const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });
};

const isLoggedOut = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return next();
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return next();
      }

      req.user = user;
      return res.redirect("/");
    } catch (error) {
      console.error("Database query error:", error);
      return next();
    }
  });
};

module.exports = { isLoggedIn, isLoggedOut };
