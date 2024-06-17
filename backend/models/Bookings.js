const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  tourId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
  ],
  guestSize: {
    type: Number,
    required: true,
  },
  bookAt: {
    type: Date,
    required: true,
  },
  extraNotes: {
    type: String,
  },
});

const Bookings = mongoose.model("tbl_bookings", bookingSchema);

module.exports = Bookings;
