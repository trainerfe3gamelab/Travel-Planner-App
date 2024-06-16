const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/Users/destinationController");
// Get all tour 
router.get('/', destinationController.getAllTours);

// Get single tour 
router.get('/:id', destinationController.getSingleTour);

// Get tour by search
router.get("/search/getTourBySearch", destinationController.getTourBySearch);
router.get("/search/getTourCount", destinationController.getTourCount);

module.exports = router;
