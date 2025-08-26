/** Throw when user tries to log in but is already logged in */
const HTTPCodes = require("../helpers/http_codes.helper");

class UserAlreadyLoggedInError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.BadRequest;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserAlreadyLoggedInError;