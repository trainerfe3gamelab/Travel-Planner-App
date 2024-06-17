const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/Users/bookingController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/tour/:id", isLoggedIn, bookingController.createBooking);
router.get("/", isLoggedIn, bookingController.getAllBooking);
router.get("/:id", isLoggedIn, bookingController.getSingleBooking);

module.exports = router;
