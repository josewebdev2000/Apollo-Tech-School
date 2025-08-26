/** Throw when we try to enroll a user to another membership plan without unenrolling first */
const HTTPCodes = require("../helpers/http_codes.helper");

class UserAlreadyEnrolledError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.Conflict;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserAlreadyEnrolledError;