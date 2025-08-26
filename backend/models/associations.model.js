/** Associate Models with Each Other */
const Category = require("./category.model");
const Course = require("./course.model");
const CourseModule = require("./coursemodule.model");
const CoursePacket = require("./coursepacket.model");
const CourseRequirement = require("./courserequirement.model");
const CourseReview = require("./coursereview.model");
const CourseSkill = require("./courseskill.model");
const LearningPath = require("./learningpath.model");
const Membership = require("./membership.model");
const Role = require("./role.model");
const User = require("./user.model");

function associateModels()
{
    /** CATEGORY & COURSE */
    Category.hasMany(Course, {
        foreignKey: "categoryId",
        as: "courses"
    });

    Course.belongsTo(Category, {
        foreignKey: "categoryId",
        as: "category"
    });

    /** COURSE & COURSE PACKET */
    CoursePacket.hasMany(Course, {
        foreignKey: "coursePacketId",
        as: "courses"
    });

    Course.belongsTo(CoursePacket, {
        foreignKey: "coursePacketId",
        as: "coursePacket"
    });

    /** COURSE & LEARNING PATH */
    LearningPath.hasMany(Course, {
        foreignKey: "learningPathId",
        as: "courses"
    });

    Course.belongsTo(LearningPath, {
        foreignKey: "learningPathId",
        as: "learningPath"
    });

    /** COURSE & MODULE */
    Course.hasMany(CourseModule, {
        foreignKey: "courseId",
        as: "courseModules"
    });

    CourseModule.belongsTo(Course, {
        foreignKey: "courseId",
        as: "course"
    });

    /** COURSE & REQUIREMENT */
    Course.hasMany(CourseRequirement, {
        foreignKey: "courseId",
        as: "courseRequirements"
    });

    CourseRequirement.belongsTo(Course, {
        foreignKey: "courseId",
        as: "course"
    });

    /** COURSE & REVIEW */
    Course.hasMany(CourseReview, {
        foreignKey: "courseId",
        as: "courseReviews"
    });

    CourseReview.belongsTo(Course, {
        foreignKey: "courseId",
        as: "course"
    });

    /** COURSE & SKILL */
    Course.hasMany(CourseSkill, {
        foreignKey: "courseId",
        as: "courseSkills"
    });

    CourseSkill.belongsTo(Course, {
        foreignKey: "courseId",
        as: "course"
    });

    /** USER & COURSE REVIEW */
    User.hasMany(CourseReview, {
        foreignKey: "userId",
        as: "courseReviews"
    });

    CourseReview.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
    });

    /** USER & MEMBERSHIP */
    Membership.hasMany(User, {
        foreignKey: "membershipId",
        as: "users"
    });

    User.belongsTo(Membership, {
        foreignKey: "membershipId",
        as: "membership"
    });

    /** USER & ROLE */
    Role.hasMany(User, {
        foreignKey: "roleId",
        as: "users"
    });

    User.belongsTo(Role, {
        foreignKey: "roleId",
        as: "role"
    });
}

module.exports = {
    associateModels
};