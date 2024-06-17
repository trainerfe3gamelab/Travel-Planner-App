const express = require("express");
const router = express.Router();

const { reservations } = require("../controllers/Admins/reservationController");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", isAdmin, reservations);

module.exports = router;
