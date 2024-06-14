const User = require("../../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found!" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Password incorrect
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ succes: false, message: "Incorrect password!" });
    }

    const { password: userPassword, role, ...rest } = user._doc;

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set Cookie
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ token, data: { ...rest }, role });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Failed to login" });
  }
};
