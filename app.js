// imports
const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const dotenv = require("dotenv");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
// routes import
const userRoutes = require("./api/users/routes");
const tripRoutes = require("./api/trip/routes");
const profileRoutes = require("./api/Profile/routes");

// setup
const app = express();
const path = require("path");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request print on every request - middlewares
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

//   middlewares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/profile", profileRoutes);

// Error handiling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Path not found handleing
app.use((req, res, next) => {
  res.json({ msg: "path was not found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
  connectDb();
});
