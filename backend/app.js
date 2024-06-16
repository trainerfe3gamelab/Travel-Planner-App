const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const authRoute = require("./routes/Auth.js");
const registerRoute = require("./routes/Register.js");
const logoutRoute = require("./routes/Logout.js");
const userDataRoutes = require("./routes/User.js");
const usersRoutes = require("./routes/Users.js");
const toursRoutes = require("./routes/Tour.js");
const reviewsRoutes = require("./routes/Review.js");
const destinationsRoutes = require("./routes/Destination.js");
const bookingsRoutes = require("./routes/Booking.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

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

app.use("/login", authRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/user", userDataRoutes);
app.use("/users", usersRoutes);
app.use("/tours", toursRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/destination", destinationsRoutes);
app.use("/booking", bookingsRoutes);

app.use("/images", express.static("images"));

app.listen(port, () => {
  connect();
  console.log("server listening on http://localhost:" + port);
});

module.exports = app;
