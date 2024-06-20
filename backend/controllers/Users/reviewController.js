const Tour = require("../../models/Tours.js");
const Reviews = require("../../models/Reviews.js");
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");

module.exports = {
  createReview: async (req, res) => {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    try {
      const tourId = req.params.tourId;
      const userId = decoded.id;
      const { reviewText, rating } = req.body;

      const newReview = new Reviews({
        tourId,
        userId,
        reviewText,
        rating,
      });

      const savedReview = await newReview.save();

      await Tour.findByIdAndUpdate(
        tourId,
        { $push: { reviews: savedReview._id } },
        { new: true, useFindAndModify: false }
      );

      return res.status(200).json({
        success: true,
        message: "Review submitted",
        data: savedReview,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Failed to submit" });
    }
  },
};
