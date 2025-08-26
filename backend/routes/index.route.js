/** Export all routes from here */
const CategoryRouter = require("./category.route");
const CourseRouter = require("./course.route");
const LearningPathRouter = require("./learningpath.route");
const CoursePacketRouter = require("./coursepacket.route");
const MembershipRouter = require("./membership.route");
const UserRouter = require("./user.route");
const CourseModulesRouter = require("./coursemodule.route");
const CourseSkillsRouter = require("./courseskill.route");
const CourseRequirementRouter = require("./courserequirement.router");
const CourseReviewRouter = require("./coursereview.route");

module.exports = {
    CategoryRouter,
    CourseRouter,
    LearningPathRouter,
    CoursePacketRouter,
    MembershipRouter,
    UserRouter,
    CourseModulesRouter,
    CourseSkillsRouter,
    CourseRequirementRouter,
    CourseReviewRouter
};