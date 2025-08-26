/** Controller of 'CourseModule' Entity */
require("dotenv").config();
const { Course, CourseModule } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for Course Module JSON View
const { courseModuleJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Course Modules of Course By Id
exports.getAllCourseModulesByCourseId = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { courseId } = req.params;

        // Validate the ID
        if (!isValidIdFormat(courseId))
        {
            throw new ValidationError("Course ID must be a positive whole number");
        }

        // Grab Course associated to the given id
        const course = await Course.findCourseById(courseId);

        // If not found, throw error
        if (!course)
        {
            throw new EntityNotFoundError(`Course of id ${courseId} could not be found`);
        }

        // Now grab all the course modules that have the courseId
        const courseModulesByCourseId = await CourseModule.findAllCourseModulesByCourseId(course.id);

        // Format each course module using the course JSON Payload
        const courseModulesPayloads = courseModulesByCourseId.map(courseModule => courseModuleJson(courseModule.id, courseModule.title, courseModule.description, courseModule.courseId));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(courseModulesPayloads);
    }

    catch (err)
    {
        // Let the middleware do the error handling
        next(err);
    }
};