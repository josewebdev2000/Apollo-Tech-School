/** JS Representation of the DB Entity "Membership" */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Membership = sequelize.define("Membership", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Title cannot be blank"
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Description cannot be blank"
            }
        }
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: {
                args: [12.0],
                msg: "Price must be at least 12.00"
            },
            isDecimal: true
        }
    }
}, {
    tableName: "memberships",
    timestamps: false
});

Membership.getAllMemberships = async() => {

    return await Membership.findAll({
        order: [["id", "ASC"]]
    });
};

Membership.getMembershipById = async (id) => await Membership.findByPk(id);

module.exports = Membership;