const express = require("express");
const {
  signup,
  login,
  refreshTokenAction,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshTokenAction);

module.exports = router;
