const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "user",
        "admin",
        "hr",
        "accounts",
        "sales",
        "support"
      ),
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
