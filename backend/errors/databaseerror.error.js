/** Throw when the DB throwns an error or can't do something */
const HTTPCodes = require("../helpers/http_codes.helper");

class DatabaseError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.InternalServerError;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = DatabaseError;