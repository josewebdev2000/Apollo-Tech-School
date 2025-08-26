/** JS Representation of the DB Entity 'CourseReview' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CourseReview = sequelize.define("CourseReview", {
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
        validate: {
            notEmpty: {
                msg: "Name cannot be empty"
            }
        }
    },
    picUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pic_url",
        validate: {
            notEmpty: {
                msg: "Profile picture URL cannot be empty"
            },
            isUrl: {
                msg: "Invalid URL format"
            }
        }
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Occupation cannot be empty"
            }
        },
        field: "occupation"
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Review description cannot be empty"
            }
        }
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "user_id"
    },
    courseId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "course_id"
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
            isInt: {
                msg: "Rating must be an integer between 1 and 5"
            }
        },
        field: "rating"
    }
}, {
    tableName: "course_reviews",
    timestamps: false
});

CourseReview.findAllCourseReviewsByCourseId = async (courseId) => {
    return await CourseReview.findAll({
        order: [["id", "ASC"]],
        where: {
            courseId: courseId
        }
    });
};

module.exports = CourseReview;