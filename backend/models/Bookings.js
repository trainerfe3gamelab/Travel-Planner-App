import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
   {
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
         required: true
      },
      bookAt: {
         type: Date,
         required: true
      },
      extraNotes: {
        type: String,
      },
   },
   { timestamps: true }
);

const Reviews = mongoose.model("Bookings", bookingSchema, 'tbl_bookings');

module.exports = Reviews;
