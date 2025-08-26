// Prepare all errors to be exported
const DatabaseError = require("./databaseerror.error");
const EntityNotFoundError = require("./entitynotfounderror.error");
const ValidationError = require("./validationerror.error");
const EntityAlreadyExists = require("./entityalreadyexists.error");
const UserAlreadyLoggedInError = require("./useralreadyloggedinerror.error");
const UserNotLoggedInError = require("./usernotloggedinerror.error");
const UserAlreadyEnrolledToMembership = require("./useralreadyenrollederror.error");
const UserNotYetEnrolledError = require("./usernotyetenrollederror.error");
const UserTokenExpiredError = require("./usertokenexpirederror.error");

module.exports = {
    DatabaseError,
    EntityNotFoundError,
    EntityAlreadyExists,
    ValidationError,
    UserAlreadyLoggedInError,
    UserNotLoggedInError,
    UserAlreadyEnrolledToMembership,
    UserNotYetEnrolledError,
    UserTokenExpiredError
};