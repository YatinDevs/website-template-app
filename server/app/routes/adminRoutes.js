const express = require("express");
const {
  createUser,
  getAllUsers,
  adminRegister,
} = require("../controllers/adminController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleMiddleware");
const router = express.Router();

// Checked Registeration done
router.post(
  "/register-admin",
  //   authenticate,
  //   checkRole(["admin", "hr"]),
  adminRegister // checked
);
// admin can be registered through postman -------> checked
// admin can login through auth login point -------> checked
// admin can create employee -------> checked
// admin can create employee and has authenticate access or not -------> checked
// admin can create employee and check for role that is admin or hr -------> checked
router.post(
  "/create-user",
  authenticate,
  checkRole(["admin", "hr"]),
  createUser
);
router.get(
  "/fetch-users",
  authenticate,
  checkRole(["admin", "hr"]),
  getAllUsers
);

module.exports = router;
