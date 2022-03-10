const express = require("express");
const { editProfile, getProfiles, getSingleProfile } = require("./controller");

const router = express.Router();

router.get("/", getProfiles);
router.get("/:profileId", getSingleProfile);
router.put("/:profileId/edit", editProfile);

module.exports = router;
