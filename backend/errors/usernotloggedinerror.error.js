/** Throw when user tries to access data that he's not authorized for bc it's not logged in */
const HTTPCodes = require("../helpers/http_codes.helper");

class UserNotLoggedInError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.Unauthorized;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserNotLoggedInError;