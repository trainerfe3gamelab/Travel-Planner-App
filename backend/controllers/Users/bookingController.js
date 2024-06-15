const User = require("../../models/Users");
const Booking = require("../../models/Bookings");
const jwt = require("jsonwebtoken");

const createBooking = async (req, res) => {
  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "No users found" });
  }

  try {
    const tourId = req.params.id;
    const userId = decoded.id;
    const { guestSize, bookAt, extraNotes } = req.body;

    const newBooking = new Booking({
      tourId,
      userId,
      guestSize,
      bookAt,
      extraNotes,
    });

    const savedBooking = await newBooking.save();
    return res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to submit" });
  }
};

module.exports = { createBooking };
