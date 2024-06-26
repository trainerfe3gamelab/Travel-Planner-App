const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const authRoute = require("./routes/Auth.js");
const registerRoute = require("./routes/Register.js");
const logoutRoute = require("./routes/Logout.js");
const userDataRoutes = require("./routes/User.js");
const usersRoutes = require("./routes/Users.js");
const toursRoutes = require("./routes/Tour.js");
const reviewsRoutes = require("./routes/Review.js");
const destinationsRoutes = require("./routes/Destination.js");
const bookingsRoutes = require("./routes/Booking.js");
const reservationRoutes = require("./routes/Reservation.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 8597;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  })
);

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connected failed", error);
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  debugger;
  res.send("Hello World dulu ");
});

app.use("/api/login", authRoute);
app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/user", userDataRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tours", toursRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/destination", destinationsRoutes);
app.use("/api/booking", bookingsRoutes);
app.use("/api/reservations", reservationRoutes);

app.use("/images", express.static("photo"));

app.listen(port, () => {
  connect();
  console.log("server listening on http://localhost:" + port);
});

module.exports = app;
