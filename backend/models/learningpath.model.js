/** JS Representation of the DB Entity 'LearningPath' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LearningPath = sequelize.define("LearningPath", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
    },
    title: {
        type: DataTypes.STRING,
        field: "title",
        allowNull: false,
        unique: {
            name: "unique_learning_path_name",
            msg: "Learning Path name must be unique"
        },
        validate: {
            notEmpty: {
                msg: "Title cannot be empty"
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: {
            name: "unique_learning_path_description",
            msg: "Learning Path description must be unique"
        },
        validate: {
            notEmpty: {
                msg: "Description cannot be empty"
            }
        }
    },
    picUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pic_url",
        validate: {
            notEmpty: {
                msg: "Image URL cannot be empty"
            },
            isUrl: {
                msg: "Invalid URL format"
            },
            isValidHttpUrl(value) {
                if (!/^https?:\/\//.test(value)) {
                    throw new Error("Invalid URL format");
                }
            }
        }
    }
}, {
    tableName: "learning_paths",
    timestamps: false
});

LearningPath.findAllLearningPaths = async () => {
    return await LearningPath.findAll({
        order: [["id", "ASC"]]
    });
};

LearningPath.findLearningPathById = async (id) => await LearningPath.findByPk(id);

module.exports = LearningPath;