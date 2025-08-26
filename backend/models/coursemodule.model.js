/** JS Representation of the DB Entity 'CourseModule' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CourseModule = sequelize.define("CourseModule", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "title",
        validate: {
            notEmpty: {
                msg: "Module title cannot be blank"
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        field: "description",
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Module description cannot be blank"
            }
        }
    },
    courseId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "course_id"
    }
}, {
    tableName: "course_modules",
    timestamps: false
});

CourseModule.findAllCourseModulesByCourseId = async(courseId) => {
    return await CourseModule.findAll({
        order: [["id", "ASC"]],
        where: {
            courseId: courseId
        }
    });
};

module.exports = CourseModule;