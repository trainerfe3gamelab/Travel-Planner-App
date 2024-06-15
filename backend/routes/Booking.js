const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/Users/bookingController");

router.post("/:id", createBooking);

module.exports = router;
