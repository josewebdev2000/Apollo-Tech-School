/** Controller for the Course Packet Model */
require("dotenv").config();
const { CoursePacket } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for course packet Json View
const { coursePacketJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Course Packets
exports.getAllCoursePackets = async(req, res, next) => {

    try
    {
        const coursePackets = await CoursePacket.findAllCoursePackets();

        // Format each course packet
        const coursePacketPayloads = coursePackets.map(coursePacket => coursePacketJson(coursePacket.id, coursePacket.title, coursePacket.description, coursePacket.picUrl));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(coursePacketPayloads);
    }

    catch (err)
    {
        // Let the middleware do the error handling
        next(err);
    }
};

// Get Course Packet By Id
exports.getCoursePacketById = async (req, res, next) => {

    try
    {
        // Grab the req param data with ID
        const { id } = req.params;
        
        // Validate the ID
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("Course Packet ID must be a whole positive number");
        }

        // Grab CoursePacket associated to the given id
        const coursePacket = await CoursePacket.findCoursePacketById(id);

        // If not found, throw error
        if (!coursePacket)
        {
            throw new EntityNotFoundError(`Course of id ${id} could not be found`);
        }

        // Form the CoursePacket Json Payload
        const coursePacketJsonPayload = coursePacketJson(coursePacket.id, coursePacket.title, coursePacket.description, coursePacket.picUrl);

        // Return the course JSON Payload
        return res.status(HTTPCodes.Ok).json(coursePacketJsonPayload);

    }

    catch (err)
    {
        // Let the middleware handle the error
        next(err);
    }
};