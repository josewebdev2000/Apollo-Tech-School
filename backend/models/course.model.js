/** JS Representation of the DB Entity 'Course' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define("Course", {
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
        unique: {
            name: "unique_course_name",
            msg: "Course name must be unique" 
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
        field: "description",
        unique: {
            name: "unique_course_description",
            msg: "Course description must be unique" 
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
                msg: "Invalid URL Format"
            },
            isValidHttpUrl(value) {
                if (!/^https?:\/\//.test(value))
                {
                    /** Change to Specialized Validation Error */
                    throw new Error("Invalid URL Format");
                }
            }
        }
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "level",
        validate: {
            notEmpty: {
                msg: "Level cannot be empty"
            }
        }
    },
    categoryId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "category_id"
    },
    coursePacketId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "course_packet_id"
    },
    learningPathId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "learning_path_id"
    }
}, {
    tableName: "courses",
    timestamps: false
});

Course.findAllCourses = async () => {
    return await Course.findAll({
        order: [["id", "ASC"]]
    });
};

Course.findCourseById = async (id) => await Course.findByPk(id);

module.exports = Course;