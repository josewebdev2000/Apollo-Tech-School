/** JS Representation of the DB Entity 'Category' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
        unique: {
            name: "unique_category_name",
            msg: "Category name must be unique"
        },
        validate: {
        notEmpty: {
            msg: "Category name cannot be empty"
            }
        }
    }
},
{
    tableName: "categories",
    timestamps: false
}
);

Category.findAllCategories = async () => {
    return await Category.findAll({
        order: [["id", "ASC"]]
    });
};

Category.findCategoryById = async (id) => await Category.findByPk(id);

module.exports = Category;