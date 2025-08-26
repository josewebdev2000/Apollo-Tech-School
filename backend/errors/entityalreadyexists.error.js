/** Throw when data about an entity that cannot be duplicated already exists */
const HTTPCodes = require("../helpers/http_codes.helper");

class EntityAlreadyExists extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        this.httpCode = HTTPCodes.BadRequest;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EntityAlreadyExists;