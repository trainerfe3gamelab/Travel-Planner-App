const express = require("express");
const reviewController = require("../controllers/Users/reviewController");

const router = express.Router()
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post('/:tourId', isLoggedIn, reviewController.createReview)

module.exports = router;