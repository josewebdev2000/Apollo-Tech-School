/** Check if user is authenticated to use certain routes */

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const { UserNotLoggedInError, UserTokenExpiredError } = require("../errors/index.error");

function authChecker(req, res, next)
{
    try
    {
        // Grab token from the cookie
        const cookieToken = req.cookies?.token;

        // If there is no Cookie Token nor request header throw UserNotLoggedInError
        if (!cookieToken)
        {
            throw new UserNotLoggedInError("You are not authorized to perform this operation");
        }

        // Verify the token
        jwt.verify(cookieToken, JWT_SECRET, (err, decoded) => {

            if (err)
            {
                throw new UserTokenExpiredError("Your session has already expired");
            }

            // Attach decoded user data to request for use in controllers
            req.user = decoded;
            next();
        });
    }

    catch (err)
    {
        next(err);
    }
}

module.exports = authChecker;