const express = require("express");
const router = express.Router();

const {
  getUserData,
  newPassword,
  uploadImage,
} = require("../controllers/Users/userDataController");

const { isLoggedIn } = require("../middleware/authMiddleware");
const { uploadUser } = require("../middleware/uploadMiddleware");

router.get("/:id", isLoggedIn, getUserData);
router.patch("/setting", isLoggedIn, newPassword);
router.patch("/upload", isLoggedIn, uploadUser.single("image"), uploadImage);

module.exports = router;
