const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  creater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Trip", TripSchema);
