/** JS Representation of the DB Entity 'CourseSkill' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CourseSkill = sequelize.define("CourseSkill", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: "id",
        primaryKey: true,
        autoIncrement: true
    },
    skill: {
        type: DataTypes.STRING,
        field: "skill",
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Skill cannot be empty"
            }
        }
    },
    courseId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "course_id"
    }
}, {
    tableName: "course_skills",
    timestamps: false
});

CourseSkill.findAllCourseSkillsByCourseId = async(courseId) => {
    return await CourseSkill.findAll({
        order: [["id", "ASC"]],
        where: {
            courseId: courseId
        }
    });
};

module.exports = CourseSkill;