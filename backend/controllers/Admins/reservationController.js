const Booking = require("../../models/Bookings");

const reservations = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    if (!bookings) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found" });
    }

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { reservations };
