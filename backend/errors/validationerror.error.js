/** Throw when a validation test failed */
const HTTPCodes = require("../helpers/http_codes.helper");

class ValidationError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.BadRequest;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationError;