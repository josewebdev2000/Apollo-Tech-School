/** Controller for the Course Model */
require("dotenv").config();
const { Course } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for course Json View
const { courseJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Courses
exports.getAllCourses = async(req, res, next) => {

    try
    {
        // Get all courses from the DB
        const courses = await Course.findAllCourses();

        // Format each course using the course JSON Payload Function
        const coursePayloads = courses.map(course => courseJson(course.id, course.title, course.description, course.picUrl, course.level));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(coursePayloads);

    }

    catch (err)
    {
        // Pass any unexpected error to the handling middleware
        next(err);
    }
};

// Get Course By Id
exports.getCourseById = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { id } = req.params;

        // Validate the ID
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("Course ID must be a positive whole number");
        }

        // Grab Course associated to the given id
        const course  = await Course.findCourseById(id);

        // If not found, throw error
        if (!course)
        {
            throw new EntityNotFoundError(`Course of id ${id} could not be found`);
        }

        // Form the Course Json Payload
        const courseJsonPayload = courseJson(course.id, course.title, course.description, course.picUrl, course.level);

        // Return the course JSON Payload
        return res.status(HTTPCodes.Ok).json(courseJsonPayload);
    }

    catch (err)
    {
        // Let the middleware handle the error
        next(err);
    }
};