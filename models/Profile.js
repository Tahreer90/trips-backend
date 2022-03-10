const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String },
  bio: { type: String },
  image: { type: String },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Profile", ProfileSchema);
