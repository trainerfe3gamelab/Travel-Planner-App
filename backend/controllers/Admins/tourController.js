const Tour = require("../../models/Tours.js");
const Reviews = require("../../models/Reviews.js");
const fs = require("fs");

module.exports = {
  createTour: async (req, res) => {
    const newTour = new Tour(req.body);
  
    // Check if a file is uploaded
    if (req.file) {
      newTour.photo = req.file.path;
    }
  
    try {
      let savedTour;
      let count = 1;
      const originalTitle = newTour.title;

      // Loop until finding a unique title
      while (true) {
          let uniqueTitle = count === 1 ? originalTitle : `${originalTitle} ${count}`;
          const tourExists = await Tour.findOne({ title: uniqueTitle });
          if (!tourExists) {
              newTour.title = uniqueTitle;
              savedTour = await newTour.save();
              break;
          }
          count++;
      }
  
      res.status(200).json({
        success: true,
        message: "Successfully added Tour",
        data: savedTour,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create. Try again!",
      });
    }
  },

  getAllTours: async (req, res) => {
    const page = parseInt(req.query.page);

    try {
      const tours = await Tour.find({}).populate('reviews').skip(page * 10).limit(10);

      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Successfully Loaded Tours Data",
        data: tours,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "Not Found",error: error.message });
    }
  },

  getSingleTour: async (req, res) => {
    const id = req.params.id;

    try {
      const tour = await Tour.findById(id).populate('reviews');

      res.status(200).json({
        success: true,
        message: "Successfully Loaded Single Tour Data",
        data: tour,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "Not Found" });
    }
  },

  getTourBySearch: async (req, res) => {
    const city = new RegExp(req.query.city, "i");
    const country = new RegExp(req.query.country, "i");
    const maxPeople = parseInt(req.query.maxPeople);

    try {
      const tours = await Tour.find({
        city,
        country,
        maxPeople: { $gte: maxPeople },
      });

      res.status(200).json({
        success: true,
        message: "Successfully Loaded Tours Data",
        data: tours,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "Not Found" });
    }
  },

  getTourCount: async (req, res) => {
    try {
      const tourCount = await Tour.estimatedDocumentCount();

      res.status(200).json({ success: true, data: tourCount });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Tours Data" });
    }
  },

  updateTour: async (req, res) => {
    const id = req.params.id;

    try {
      const tour = await Tour.findById(id);
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: "Tour not found",
        });
      }

      const oldPhoto = tour.photo;

      // Update tour details
      tour.set(req.body);

      // Check if a new file is uploaded
      if (req.file) {
        tour.photo = req.file.path;
      }

      // Check if a new name is already in use
      if (req.body.title && req.body.title !== oldTitle) {
        const existingTour = await Tour.findOne({ title: req.body.title });
        if (existingTour) {
            return res.status(400).json({
                success: false,
                message: "Tour name already exists. Please choose a different name.",
            });
        }
    }

      await tour.save();

      // Delete old photo if a new one is uploaded
      if (req.file && oldPhoto) {
        fs.unlink(oldPhoto, (err) => {
          if (err) {
            console.error("Failed to delete old photo:", err);
          }
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully updated Tour Data",
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update" });
    }
  },

  deleteTour: async (req, res) => {
    const id = req.params.id;

    try {
      // Check tour to get the photo path
      const tour = await Tour.findById(id);

      if (!tour) {
        return res
          .status(404)
          .json({ success: false, message: "Tour not found" });
      }

      const photoPath = tour.photo;

      // Delete Review that's connected to tour
      await Reviews.deleteMany({ tourId: id });

      // Delete the tour from the database
      await Tour.findByIdAndDelete(id);

      // Delete the photo file if it exists
      if (photoPath) {
        fs.unlink(photoPath, (err) => {
          if (err) {
            console.error("Failed to delete photo:", err);
          }
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Successfully deleted Tour" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete" });
    }
  },

  deleteReview: async (req, res) => {
    const reviewId = req.params.reviewId;

    try {
      //Find Review By Id
      const review = await Reviews.findById(reviewId);

      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }

      // Delete Review
      await Reviews.findByIdAndDelete(reviewId);

      res.status(200).json({ success: true, message: "Successfully deleted review" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete review" });
    }
  },
};
