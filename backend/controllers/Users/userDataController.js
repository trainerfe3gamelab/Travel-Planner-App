const User = require("../../models/Users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const getUserData = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    const id = req.params.id;

    if (id === decoded.id) {
      const { password: userPassword, role, ...rest } = user._doc;

      return res.status(200).json({ success: true, data: rest, role });
    }

    return res.status(401).json({ success: false, message: "Access denided" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const newPassword = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    const { password, newPassword, newPassword2 } = req.body;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (newPassword !== newPassword2) {
      return res
        .status(400)
        .json({ success: false, message: "New passwords do not match" });
    }

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ succes: false, message: "Incorrect password!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.set({ password: hashedPassword, updatedAt: Date.now() });
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const uploadImage = async (req, res) => {
  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  const oldProfile = user.photo;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded or invalid file type",
    });
  }

  user.set({ photo: req.file.path, updatedAt: Date.now() });
  await user.save();

  if (oldProfile) {
    fs.unlink(oldProfile, (err) => {
      if (err) {
        console.error("Failed to delete old profile picture:", err);
      }
    });
  }

  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    filePath: req.file.path,
  });
};

module.exports = { getUserData, newPassword, uploadImage };
