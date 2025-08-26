/** Controller for the "Membership" Entity */
require("dotenv").config();
const { Membership } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for Membership Json View
const { membershipJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Memberships
exports.getAllMemberships = async (req, res, next) => {

    try
    {
        // Get all memberships from the DB
        const memberships = await Membership.getAllMemberships();

        // Format each membership using the Json View
        const membershipPayloads = memberships.map(membership => membershipJson(membership.id, membership.title, membership.description, membership.price));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(membershipPayloads);
    }

    catch (err)
    {
        // Let middleware handle the error
        next(err);
    }
};

// Get Memberships By Id
exports.getMembershipById = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { id } = req.params;

        // Validate the ID
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("Membership ID must be a positive whole number");
        }

        // Grab Membership path associated to the given id
        const membership = await Membership.getMembershipById(id);

        // If not found, throw error
        if (!membership)
        {
            throw new EntityNotFoundError(`Membership of id ${id} could not be found`);
        }

        // Form the Membership Path Json Payload
        const membershipPayload = membershipJson(membership.id, membership.title, membership.description, membership.price);

        // Return the membership JSON payload
        return res.status(HTTPCodes.Ok).json(membershipPayload);
    }

    catch (err)
    {
        // Let the middleware handle the error
        next(err);
    }
};