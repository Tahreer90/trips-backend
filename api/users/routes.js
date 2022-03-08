const express = require("express");
const { signup, getUsers, signin } = require("./controller");
const passport = require("passport");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
