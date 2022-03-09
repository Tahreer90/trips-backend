const express = require("express");
const {
  signup,
  getUsers,
  signin,
  tripCreate,
  getUser,
} = require("./controller");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  const user = await getUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user ID is not found!");
    err.status = 404;
    next(err);
  }
});

router.get("/", getUsers);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/:userId/trip", upload.single("image"), tripCreate);

module.exports = router;
