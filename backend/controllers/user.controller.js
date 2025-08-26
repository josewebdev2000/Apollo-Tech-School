/** Controller for the User Model */
require("dotenv").config();
const { User, Role, Membership } = require("../models/index.model");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const HTTPCodes = require("../helpers/http_codes.helper");
const { 
    userRegisterJson, 
    userLoginJson, 
    userLogoutJson, 
    userUpdateJson, 
    userDeleteJson,
    membershipJson, 
    userEnrolledInMembershipMsg, 
    userDeenrolledFromMembershipMsg } = require("../json/index.json");

// Import Utils
// const { getTodaysDate } = require("../helpers/funcs.helper");

// Import Exceptions
const { 
    EntityAlreadyExists, 
    EntityNotFoundError, 
    ValidationError, 
    UserAlreadyLoggedInError, 
    UserNotLoggedInError,
    UserAlreadyEnrolledToMembership,
    UserNotYetEnrolledError,
} = require("../errors/index.error");

// Import Validators
const { NameValidator, EmailValidator, PasswordValidator, UrlValidator } = require("../validators/index.validator");
const path = require("path");
const { isValidIdFormat } = require("../helpers/funcs.helper");

// Grab the JWT Secret
const { JWT_SECRET, JWT_EXPIRATION_PERIOD, JWT_COOKIE_EXPIRATION_PERIOD } = process.env;

// Register a new user
exports.register = async (req, res, next) => {

    try
    {
        // Grab JSON data from the front-end
        const { firstName, lastName, email, password } = req.body;

        // If name does not pass regex, throw ValidationError
        if (!NameValidator.isValidName(firstName) || !NameValidator.isValidName(lastName))
        {
            throw new ValidationError("Only letters and whitespace characters allowed");
        }

        // If email does not pass regex, throw ValidationError
        if (!EmailValidator.isValidEmail(email))
        {
            throw new ValidationError(`"${email}" is invalid`);
        }

        // If password does not pass regex, throw ValidationError
        if (!PasswordValidator.isValidPassword(password))
        {
            throw new ValidationError("Password needs at least 8 characters, no whitespace, at least one uppercase letter, one lowercase letter, and no symbols");
        }

        // Check if a user already exists with the same email
        const userInDbData = await User.getUserByEmail(email);

        // If a user was found, throw an EntityAlreadyExists Error
        if (userInDbData)
        {
            throw new EntityAlreadyExists(`Email ${email} is already registered`);
        }

        // Hash the password
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        // Extract "ROLE_USER" 
        const roleUser = await Role.getRoleByName("ROLE_USER");

        if (!roleUser)
        {
            throw new EntityNotFoundError("User Role has not been found in the DB");
        }

        // Create a new user in the DB
        const newUser = await User.register({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            roleId:  roleUser.id
        });

        // Create JWT Token to send
        const token = jwt.sign({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            picUrl: newUser.picUrl,
            membershipId: membershipId,
            roleId: roleUser.id
        },
        JWT_SECRET,
        {expiresIn: JWT_EXPIRATION_PERIOD}
        );

        // Save the token in a cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Prepare proper response for registration
        const successRegisterRes = userRegisterJson(newUser.id, newUser.firstName, newUser.lastName, newUser.email, newUser.picUrl, newUser.membershipId);

        // Return response
        return res.status(HTTPCodes.Created).json(successRegisterRes);
    }

    catch (err)
    {
        // Leave error handling to the middleware
        next(err);
    }
};

// Login existing user
exports.login = async (req, res, next) => {

    try
    {
        // Grab data from the user
        const { email, password } = req.body;

        // Validate email and password
        if (!EmailValidator.isValidEmail(email))
        {
            throw new ValidationError(`Email: ${email} is invalid`);
        }

        if (!PasswordValidator.isValidPassword(password))
        {
            throw new ValidationError("Password needs at least 8 characters, no whitespace, at least one uppercase letter, one lowercase letter, and no symbols");
        }

        // Try to find a user by email
        const user = await User.getUserByEmail(email);

        // If the SpringUser is not found, throw EntityNotFoundError
        if (!user)
        {
            throw new EntityNotFoundError("Incorrect Credentials");
        }

        // Compare hashed password from the one given to the DB and the one on the request body
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        // If the hashedPassword is not the same as the one in the DB, throw a validation error
        if (hashedPassword !== user.password)
        {
            throw new ValidationError("Incorrect Credentials");
        }

        // Check if a JWT token already exists
        const token = req.cookies.token;

        if (token)
        {
            // Create JWT Token
            // Try to check if a valid token already exists for the user
            try
            {
                jwt.verify(token, JWT_SECRET);
                // Throw AlreadyLoggedInError
                throw UserAlreadyLoggedInError("You are already logged in to the system");
            }

            catch (err)
            {
                // Create new JWT Token since there isn't one
                const newToken = jwt.sign({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    picUrl: user.picUrl,
                    membershipId: user.membershipId,
                    roleId: user.roleId
                },
                JWT_SECRET,
                {
                    expiresIn: JWT_EXPIRATION_PERIOD
                }
                );

                res.cookie("token", newToken, {
                    path: "/",
                    httpOnly: true,
                    maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
                    secure: false,
                    sameSite: "lax"
                });
            }
        }

        // Create token in case there is none
        const newToken = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picUrl: user.picUrl,
            membershipId: user.membershipId,
            roleId: user.roleId
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION_PERIOD
        }
        );

        res.cookie("token", newToken, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Prepare proper response for login 
        const successLoginRes = userLoginJson(user.id, user.firstName, user.lastName, user.email, user.picUrl, user.membershipId);

        // Return response
        return res.status(HTTPCodes.Ok).json(successLoginRes);

    }

    catch (err)
    {
        // Error handle to middleware
        next(err);
    }
};

// Logout user
exports.logout = async (req, res, next) => {

    try
    {
        // Check the token cookie is set from client-side
        const token = req.cookies.token;

        // If the token is not set up, the user is not authenticated
        if (!token)
        {
            throw new UserNotLoggedInError("You are not authenticated");
        }

        // If there is an error, return early error response
        res.clearCookie("token");

        // Clear the authentication token cookie and send success message
        const successLogoutRes = userLogoutJson({ message: "You logged out successfully" });
        return res.status(HTTPCodes.Ok).json(successLogoutRes);
    }

    catch (err)
    {
        // Let middleware handle errors
        next(err);
    }
};

// Get Membership Of User
exports.getUserMembership = async (req, res, next) => {

    // Grab the membership plan a user has
    try
    {
        // Grab user data since this is a protected route
        const { id } = req.user;

        // If userId is not set, throw a ValidationError
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("User ID must be a positive whole number");
        }

        // Get the user by Id
        const user = await User.getUserById(id);

        // If no user throw EntityNotFoundError
        if (!user)
        {
            throw new EntityNotFoundError(`User of id ${id} could not be found`);
        }

        // If the membership ID is not valid, return not enrolled yet
        if (!isValidIdFormat(user.membershipId))
        {
            throw new UserNotYetEnrolledError("You are not enrolled to any membership plan");
        }

        // Grab the membership the user is enrolled to
        const membership = await Membership.getMembershipById(user.membershipId);

        // Prepare membership payload
        const membershipPayload = membershipJson(membership.id, membership.title, membership.description, membership.price);

        // Return the membership JSON payload
        return res.status(HTTPCodes.Ok).json(membershipPayload);
    }

    catch (err)
    {
        // Let the middleware do the error handling
        next(err);
    }
};

// Change firstName and lastName of user
exports.updateNames = async (req, res, next) => {

    try
    {
        // Grab id since this is a protected route
        const { id } = req.user;

        // Grab firstName and lastName from the request body
        const { firstName, lastName } = req.body;

        // Validate id
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("User ID must be a positive whole number");
        }

        // Validate first name and last name
        if (!NameValidator.isValidName(firstName) || !NameValidator.isValidName(lastName))
        {
            throw new ValidationError("Only letters and whitespace characters allowed");
        }

        // Get User From The DB
        const user = await User.getUserById(id);

        if (!user)
        {
            throw new EntityNotFoundError(`User of id ${id} could not be found`);
        }

        // Change user's first and last name
        user.firstName = firstName;
        user.lastName = lastName;

        // Save user's new data in the DB
        await user.save();

       // Create new user token with updated membership data
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picUrl: user.picUrl,
            membershipId: user.membershipId,
            roleId: user.roleId
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION_PERIOD
        }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Prepare proper response for login 
        const successLoginRes = userUpdateJson(user.id, user.firstName, user.lastName, user.email, user.picUrl, user.membershipId);

        // Return response
        return res.status(HTTPCodes.Ok).json(successLoginRes);
    }

    catch (err)
    {
        // Let middleware do the error handling
        next(err);
    }
}; 

// Update the user's profile picture
exports.updatePicUrl = async (req, res, next) => {

    try
    {
        // Grab id since it's a protected route
        const { id } = req.user;

        // Grab picUrl from the request
        const { picUrl } = req.body;

        // Validate ID formats
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("User ID must be a whole positive number");
        }

        // Validate the picUrl that comes from the request
        if (!UrlValidator.isValidUrl(picUrl))
        {
            throw new ValidationError("The given URL is not valid");
        }

        // Get User From the DB
        const user = await User.getUserById(id);

        // Change the picUrl
        user.picUrl = picUrl;

        // Save changes
        await user.save();

        // Create new user token with updated membership data
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picUrl: user.picUrl,
            membershipId: user.membershipId,
            roleId: user.roleId
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION_PERIOD
        }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Prepare proper response for login 
        const successLoginRes = userUpdateJson(user.id, user.firstName, user.lastName, user.email, user.picUrl, user.membershipId);

        // Return response
        return res.status(HTTPCodes.Ok).json(successLoginRes);
    }

    catch (err)
    {
        // Let middleware handle errors
        next(err);
    }

};

// Enroll user to membership plan
exports.enrollInMembership = async (req, res, next) => {

    try
    {
        // Grab id since this is a protected route
        const { id } = req.user;
        
        // Grab the userId and membershipId in a JSON Body
        const { membershipId } = req.body;

        // If userId is not set, throw a ValidationError
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("User ID must be a positive whole number");
        }

        if (!isValidIdFormat(membershipId))
        {
            throw new ValidationError("Membership ID must be a positive whole number");
        }

        // Grab the user out of the user Id
        const user = await User.getUserById(id);
        
        // Grab the membership by Id as well
        const membership = await Membership.getMembershipById(membershipId);

        // Throw Entity Not Found Error if the user could not be found
        if (!user)
        {
            throw new EntityNotFoundError(`User of id ${id} could not be found`);
        }

        // Throw EntityNotFoundError if membership could not be found
        if (!membership)
        {
            throw new EntityNotFoundError(`Membership of id ${membershipId} could not be found`);
        }

        // If the user is already enroll in a membership plan, he needs to unenroll first
        if (isValidIdFormat(user.membershipId))
        {
            throw new UserAlreadyEnrolledToMembership("You are already registered to a membership plan");
        }

        // Set the membershipId to the id of the found membership
        user.membershipId = membership.id;

        // Save the changes
        await user.save();

        // Create new user token with updated membership data
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picUrl: user.picUrl,
            membershipId: user.membershipId,
            roleId: user.roleId
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION_PERIOD
        }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Prepare successful enrollment message
        const userEnrollmentMsg = userEnrolledInMembershipMsg(user.membershipId, `You have successfully enrolled to the ${membership.title} membership plan`);

        // Return the response
        return res.status(HTTPCodes.Ok).json(userEnrollmentMsg);
    }

    catch (err)
    {
        // Let the middleware do the error handling
        next(err);
    }
};

// De-Enroll User From Membership Plan
exports.deenrollFromMembership = async (req, res, next) => {

    try
    {
        // Grab the data from user since this is a protected royte
        const { id } = req.user;

        // If userId is not set, throw a ValidationError
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("User ID must be a positive whole number");
        }

        // Grab the user out of the user Id
        const user = await User.getUserById(id);

        // Throw Entity Not Found Error if the user could not be found
        if (!user)
        {
            throw new EntityNotFoundError(`User of id ${id} could not be found`);
        }

        // If user is not enrolled to any message plan, return an error to
        if (!isValidIdFormat(user.membershipId))
        {
            throw new UserNotYetEnrolledError("User is not yet enrolled to any membership plan");
        }

        // Find the membership plan the user is enrolled to
        const membership = await Membership.getMembershipById(user.membershipId);

        // Set the membership ID to null
        user.membershipId = null;

        // Save changes
        await user.save();

        // Create new user token with updated membership data
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picUrl: user.picUrl,
            membershipId: user.membershipId,
            roleId: user.roleId
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRATION_PERIOD
        }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD,
            sameSite: "lax",
            secure: false
        });

        // Return message that user de-enrolled from membership plan
        const unenrollmentMsg = userDeenrolledFromMembershipMsg(`You have successfully un-enrolled from the ${membership.title} membership plan`);

        // Return the message
        return res.status(HTTPCodes.Ok).json(unenrollmentMsg);

    }

    catch (err)
    {
        // Let the middleware do all the error handling
        next(err);
    }
};
