const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tours",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema, 'tbl_reviews');

module.exports = Reviews;