const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/Users/destinationController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Get all tour 
router.get('/', destinationController.getAllTours);

// Get single tour 
router.get('/:id', isLoggedIn, destinationController.getSingleTour);

// Get tour by search
router.get("/search/getTourBySearch", isLoggedIn, destinationController.getTourBySearch);
router.get("/search/getTourCount", isLoggedIn, destinationController.getTourCount);

module.exports = router;
