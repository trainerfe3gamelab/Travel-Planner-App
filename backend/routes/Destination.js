const express = require("express");
const router = express.Router();
const toursController = require("../controllers/Users/destinationController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Get all tour 
router.get('/', isLoggedIn, toursController.getAllTours);

// Get single tour 
router.get('/:id', isLoggedIn, toursController.getSingleTour);

// Get tour by search
router.get("/search/getTourBySearch", isLoggedIn, toursController.getTourBySearch);
router.get("/search/getTourCount", isLoggedIn, toursController.getTourCount);

module.exports = router;
