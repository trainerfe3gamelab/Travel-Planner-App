const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/Users/bookingController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/:id", isLoggedIn, bookingController.createBooking)

module.exports = router;
