/** Throw when we try to unenroll a user from a membership plan when the user is not enrolled to any yet */
const HTTPCodes = require("../helpers/http_codes.helper");

class UserNotYetEnrolledError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.Conflict;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserNotYetEnrolledError;