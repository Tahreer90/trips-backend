const res = require("express/lib/response");
const Profile = require("../../models/Profile");

exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

exports.getSingleProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }

    const profile = await Profile.findByIdAndUpdate(
      { _id: req.params.profileId },
      req.body,
      { new: true } // returns the updated product
    );
    res.status(200).json(profile);
  } catch (err) {
    next(error);
  }
};
