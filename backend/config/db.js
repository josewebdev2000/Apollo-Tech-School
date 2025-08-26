/**
 * Establish Database Connection
 * Use Sequelize for ORMs
 */

const { Sequelize } = require("sequelize");

// Read Environment Variables
require("dotenv").config();

// Import Environment Variables
const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_DIALECT,
    DB_PASS
} = process.env;

// Start out Sequelize
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: DB_DIALECT
    }
);

module.exports = sequelize;