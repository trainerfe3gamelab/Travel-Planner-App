const Bookings = require("../../models/Bookings");
const Users = require("../../models/Users");
const Tours = require("../../models/Tours");

const reservations = async (req, res) => {
  try {
    const results = await Bookings.aggregate([
      {
        $lookup: {
          from: Users,
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $lookup: {
          from: Tours,
          localField: "tourId",
          foreignField: "_id",
          as: "tourData",
        },
      },
      {
        $unwind: "$tourData",
      },
      {
        $project: {
          _id: 1,
          bookingDate: 1,
          userId: 1,
          user: "$userData",
          tourId: 1,
          tour: "$tourData",
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { reservations };
