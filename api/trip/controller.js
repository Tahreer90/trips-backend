const Trip = require("../../models/Trip");

exports.fetchtrip = async (tripId, next) => {
  try {
    const trip = await Product.findById(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    return res.json(trips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    await req.trip.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }

    const trip = await Trip.findByIdAndUpdate(
      { _id: req.trip.id },
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    res.status(200).json(trip);
  } catch (err) {
    next(error);
  }
};
