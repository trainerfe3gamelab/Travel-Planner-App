const jwt = require("jsonwebtoken");

const isSuperAdmin = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const role = decoded.role;

    if (role != 3) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Access denied" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const role = decoded.role;

    if (role != 2) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Access denied" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  isSuperAdmin,
  isAdmin,
};
