const Bookings = require("../../models/Bookings");
const Users = require("../../models/Users");
const Tours = require("../../models/Tours");

const reservations = async (req, res) => {
  try {
    const results = await Bookings.aggregate([
      {
        $lookup: {
          from: "tbl_users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "tbl_tours",
          localField: "tourId",
          foreignField: "_id",
          as: "tour",
        },
      },
      {
        $unwind: "$tour",
      },
      {
        $project: {
          _id: 1,
          dataUser: {
            _id: "$user._id",
            username: "$user.username",
            email: "$user.email",
          },
          dataTour: { _id: "$tour._id", tourTitle: "$tour.title" },
          guestSize: 1,
          bookAt: 1,
          extraNotes: 1,
        },
      },
    ]);

    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { reservations };
