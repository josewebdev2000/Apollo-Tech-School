/** Throw this error when the user JWT token has already expired */
const HTTPCodes = require("../helpers/http_codes.helper");

class UserTokenExpiredError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.Forbidden;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserTokenExpiredError;