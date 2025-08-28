// Export all models to be used by the app
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
const PasswordResetToken = require("./passwordresettoken.model");
const { associateModels } = require("./associations.model");

// Export all models to the world
module.exports = {
    associateModels,
    Category,
    CoursePacket,
    LearningPath,
    Role,
    Membership,
    User,
    Course,
    CourseModule,
    CourseRequirement,
    CourseReview,
    CourseSkill,
    PasswordResetToken
};