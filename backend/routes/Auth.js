const express = require("express");
const router = express.Router();

const { isLoggedOut } = require("../middleware/authMiddleware");
const authController = require("../controllers/Users/authController");

router.post("/", isLoggedOut, authController);
router.get("/", isLoggedOut);

module.exports = router;
