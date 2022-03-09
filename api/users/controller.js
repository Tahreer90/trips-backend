const Users = require("../../models/User");
const Trip = require("../../models/Trips");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (userId, next) => {
  try {
    const user = await Users.findById(userId);
    if (user) return user;
    else {
      const error = new Error("User ID is not found!");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await Users.create(req.body);

    const payLoad = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIMER, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  try {
    const newUser = req.user;

    const payLoad = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIMER, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.creater = req.user._id;

    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
