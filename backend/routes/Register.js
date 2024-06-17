const express = require("express");
const router = express.Router();

const { isLoggedOut } = require("../middleware/authMiddleware");
const registerController = require("../controllers/Users/registerController");

router.post("/", isLoggedOut, registerController);
router.get("/", isLoggedOut);

module.exports = router;
