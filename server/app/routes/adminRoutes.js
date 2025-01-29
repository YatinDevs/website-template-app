const express = require("express");
const { createUser, getAllUsers } = require("../controllers/adminController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-user", authenticate, isAdmin, createUser);
router.get("/fetch-users", authenticate, isAdmin, getAllUsers);

module.exports = router;
