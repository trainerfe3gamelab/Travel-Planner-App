const User = require("../../models/Users");
const Booking = require("../../models/Bookings");
const jwt = require("jsonwebtoken");

module.exports = {
  createBooking : async (req, res) => {
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
        message: "Booking submitted",
        data: savedBooking,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to submit" });
    }
  },

  getAllBooking: async (req, res) => {
    const page = parseInt(req.query.page); 

    try {
      const token = req.cookies.accessToken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ success: false, message: "No users found" });
      }
      const bookings = await Booking.find({ userId: user._id })
                                    .skip(page * 10)
                                    .limit(10);

      res.status(200).json({
        success: true,
        count: bookings.length,
        message: "Successfully Loaded Booking Data",
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to load Booking Data", error: error.message });
    }
  },

  getSingleBooking: async (req, res) => {
    
    try {
      const token = req.cookies.accessToken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "No users found" });
      }
  
      const booking = await Booking.findOne({ _id: req.params.id, userId: user._id });
  
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Successfully Loaded Booking Data",
        data: booking,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to load Booking Data", error: error.message });
    }
  },
};
