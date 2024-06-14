const express = require("express");
const router = express.Router();
const tourController = require("../controllers/Admins/tourController");
const { uploadAdmin } = require("../middleware/uploadMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// Create new tour 
router.post("/", uploadAdmin.single("image"), tourController.createTour);

// Get all tour 
router.get('/', isAdmin, tourController.getAllTours);

// Get single tour 
router.get('/:id', isAdmin, tourController.getSingleTour);

// Get tour by search
router.get("/search/getTourBySearch", isAdmin, tourController.getTourBySearch);
router.get("/search/getTourCount", isAdmin, tourController.getTourCount);

// Update tour 
router.put('/:id', isAdmin, uploadAdmin.single("image"), tourController.updateTour);

// Delete tour 
router.delete('/:id', isAdmin, tourController.deleteTour);

// Delete review 
router.delete('/reviews/:reviewId', isAdmin, tourController.deleteReview);

module.exports = router;
