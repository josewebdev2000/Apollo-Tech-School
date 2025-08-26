/** Throw when data about an entity that does not exist in the DB is tried to be handled */
const HTTPCodes = require("../helpers/http_codes.helper");

class EntityNotFoundError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.NotFound;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EntityNotFoundError;