/** JS Representation of the DB Entity "Role" */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "roles",
    timestamps: false
});

// Get Role by Id
Role.getRoleById = async (id) => await Role.findByPk(id);

// Get Role by Name
Role.getRoleByName = async (name) => await Role.findOne({ where : { name: name }});

module.exports = Role;