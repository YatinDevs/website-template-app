const User = require("../models/userModel");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ error: "Forbidden. You do not have access." });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { checkRole };
