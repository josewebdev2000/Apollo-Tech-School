/** JS Representation of the 'PasswordResetToken' Entity */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const { isWithinTheLast15Mins, generateUniqueRandomPin } = require("../helpers/funcs.helper");

const PasswordResetToken = sequelize.define("PasswordResetToken", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: "id",
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "user_id"
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "password_reset_tokens",
    timestamps: false
});

// Set the expiresAt to 15 minutes after being created
PasswordResetToken.beforeCreate(passwordResetToken => {

    if (!passwordResetToken.expiresAt)
    {
        passwordResetToken.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    }
});

// Get a password reset token by the token
PasswordResetToken.getPasswordResetTokenByToken = async (token) => await PasswordResetToken.findOne({ where: { token: token }});

// Generate new Passowrd Reset TOken
PasswordResetToken.createNewToken = async (userId) => {
    return await PasswordResetToken.create({
        token: generateUniqueRandomPin(),
        userId
    });
};

// Validate password reset token
PasswordResetToken.validateToken = async (passwordResetToken) => {

    // Greab today's date
    const today = new Date();

    // Return true if passwordResetToken exists and if the expiry date is within the last 15 minutes
    return passwordResetToken && isWithinTheLast15Mins(passwordResetToken.expiresAt)
};

// Delete All PasswordResetTokens of a given user
PasswordResetToken.deleteAllByUserId = async (userId) => await PasswordResetToken.destroy({ where: { userId }});

module.exports = PasswordResetToken;