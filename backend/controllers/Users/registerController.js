const User = require("../../models/Users.js");
const bcrypt = require("bcrypt");

// Register
module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usernameUser = await User.findOne({ username });

    if (usernameUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already registered!" });
    }

    const emailUser = await User.findOne({ email });

    if (emailUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ success: true, message: "Register successfully " });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Failed to register" });
  }
};
