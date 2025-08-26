/** Learning Path Controller JS */
require("dotenv").config();
const { LearningPath } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for learningPath Json View
const { learningPathJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All LearningPaths
exports.getAllLearningPaths = async (req, res, next) => {

    try
    {
        // Get all learning paths from the DB
        const learningPaths = await LearningPath.findAllLearningPaths();

        // Format each learning path using the learning path JSON Payload
        const learningPathPayloads = learningPaths.map(learningPath => learningPathJson(learningPath.id, learningPath.title, learningPath.description, learningPath.picUrl));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(learningPathPayloads);
    }

    catch (err)
    {
        // Pass any unexpected error to the handling middleware
        next(err);
    }
};

// Get Categories By Id
exports.getLearningPathById = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { id } = req.params;

        // Validate the ID
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("Learning Path ID must be a positive whole number");
        }

        // Grab Learning path associated to the given id
        const learningPath = await LearningPath.findLearningPathById(id);

        // If not found, throw error
        if (!learningPath)
        {
            throw new EntityNotFoundError(`Learning Path of id ${id} could not be found`);
        }

        // Form the Learning Path Json Payload
        const learningPathJsonPayload = learningPathJson(learningPath.id, learningPath.title, learningPath.description, learningPath.picUrl);

        // Return the learning path JSON Payload
        return res.status(HTTPCodes.Ok).json(learningPathJsonPayload);
    }

    catch (err)
    {
        // Let the middleware handle the error
        next(err);
    }
};