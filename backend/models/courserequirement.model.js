/** JS Representation of the DB Entity 'CourseRequirement' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CourseRequirement = sequelize.define("CourseRequirement", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: "id",
        autoIncrement: true,
        primaryKey: true
    },
    requirement: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "requirement",
        validate: {
            notEmpty: {
                msg: "Requirement cannot be empty"
            }
        }
    },
    courseId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "course_id"
    }
}, {
    tableName: "course_requirements",
    timestamps: false
});

CourseRequirement.findAllCourseRequirementsByCourseId = async(courseId) => {
    return await CourseRequirement.findAll({
        order: [["id", "ASC"]],
        where: {
            courseId: courseId
        }
    });
};

module.exports = CourseRequirement;