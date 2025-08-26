/** JS Representation of the DB Entity 'CoursePacket' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CoursePacket = sequelize.define("CoursePacket", {
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
            name: "unique_course_packet_name",
            msg: "Course Packet name must be unique"
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
            name: "unique_course_packet_description",
            msg: "Course Packet description must be unique"
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
    tableName: "course_packets",
    timestamps: false
});

CoursePacket.findAllCoursePackets = async () => {
    return await CoursePacket.findAll({
        order: [["id", "ASC"]]
    });
};

CoursePacket.findCoursePacketById = async (id) => await CoursePacket.findByPk(id);


module.exports = CoursePacket;