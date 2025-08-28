// Export all JSON objects
const { categoryJson } = require("./category.json");
const { courseJson } = require("./course.json");
const { learningPathJson } = require("./learningpath.json");
const { coursePacketJson } = require("./coursepacket.json");
const { membershipJson } = require("./membership.json");
const { userRegisterJson, userLoginJson, userLogoutJson, userUpdateJson, userDeleteJson, userEnrolledInMembershipMsg, userDeenrolledFromMembershipMsg } = require("./user.json");
const { courseModuleJson } = require("./coursemodule.json");
const { courseSkillJson } = require("./courseskill.json");
const { courseRequirementJson } = require("./courserequirement.json");
const { courseReviewJson } = require("./coursereview.json");
const { requestTokenJson, invalidTokenJson, validTokenJson } = require("./passwordresettoken.json");

module.exports = {
    categoryJson,
    courseJson,
    coursePacketJson,
    learningPathJson,
    membershipJson,
    userRegisterJson,
    userLoginJson,
    userLogoutJson,
    userUpdateJson,
    userDeleteJson,
    userEnrolledInMembershipMsg,
    userDeenrolledFromMembershipMsg,
    courseModuleJson,
    courseSkillJson,
    courseRequirementJson,
    courseReviewJson,
    requestTokenJson,
    validTokenJson,
    invalidTokenJson
};