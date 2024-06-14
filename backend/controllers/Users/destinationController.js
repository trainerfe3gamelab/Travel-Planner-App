const Tour = require("../../models/Tours.js");

module.exports = {

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
};
