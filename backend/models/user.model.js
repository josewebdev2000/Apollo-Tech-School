/** JS Representation of the DB Entity "User" */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Avatar = require("../config/avatars");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
        },
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-z]+(\s[A-Za-z]+)*$/
        },
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        },
        field: "email"
    },
    picUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pic_url",
        defaultValue: Avatar.USER,
        validate: {
            isUrl: {
                msg: "Please enter a valid URL"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password"
    },
    membershipId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "membership_id"
    },
    roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "role_id"
    }

}, {
    tableName: "users",
    timestamps: false
});

// Static methods to deal with the DB

// Get User By ID
User.getUserById = async (id) => await User.findByPk(id);

// Get User By Email
User.getUserByEmail = async (email) => await User.findOne({ where: { email: email} });

// Register a new user
User.register = async (data) => await User.create(data);

// Delete user by Id
User.deleteById = async(id) => User.destroy({ where: { id: id }});

module.exports = User;