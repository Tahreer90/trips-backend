const express = require("express");

const { fetchtrip, tripDelete, getTrips, tripUpdate } = require("./controller");
const upload = require("../../middleware/multer");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchtrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip ID is not found!");
    err.status = 404;
    next(err);
  }
});

router.get("/", getTrips);
router.delete("/:tripId", tripDelete);
router.put("/:tripId", upload.single("image"), tripUpdate);

module.exports = router;
