/** Controller for the 'CourseRequirement' Entity */
require("dotenv").config();
const { Course, CourseRequirement } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

// Request for Course Requirement JSON View
const { courseRequirementJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");
const { isValidIdFormat } = require("../helpers/funcs.helper");

// Get All Course Requirements of Course By Id
exports.getAllCourseRequirementsByCourseId = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { courseId } = req.params;

        // Validate the ID
        if (!isValidIdFormat(courseId))
        {
            throw new ValidationError("Course ID must be a positive whole number");
        }

        // Grab course associated to the given id
        const course = await Course.findCourseById(courseId);

        // If not found, throw error
        if (!course)
        {
            throw new EntityNotFoundError(`Course of id ${courseId} could not be found`);
        }

        // Now grab all the course requirements the have the courseId
        const courseRequirementsByCourseId = await CourseRequirement.findAllCourseRequirementsByCourseId(course.id);

        // Format each course requirement using the course requirement JSON View
        const courseRequirementsPayload = courseRequirementsByCourseId.map(courseRequirement => courseRequirementJson(courseRequirement.id, courseRequirement.requirement, courseRequirement.courseId));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(courseRequirementsPayload);
    }

    catch (err)
    {
        // Let the middleware handle errors
        next(err);
    }
};