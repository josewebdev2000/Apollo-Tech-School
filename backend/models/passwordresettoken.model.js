/** JS Representation of the 'PasswordResetToken' Entity */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PasswordResetToken = sequelize.define("PasswordResetToken", {}, {});

module.exports = PasswordResetToken;