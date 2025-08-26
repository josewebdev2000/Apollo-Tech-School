/** Controller for the 'CourseSkill' Entity */
require("dotenv").config();
const { Course, CourseSkill } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

// Request for Course Skill JSON View
const { courseSkillJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");
const { isValidIdFormat } = require("../helpers/funcs.helper");

// Get All Course Skill of Course By Id
exports.getAllCourseSkillsModulesByCourseId = async (req, res, next) => {

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

        // Now grab all the course skills that have the courseId
        const courseSkillsByCourseId = await CourseSkill.findAllCourseSkillsByCourseId(course.id);

        // Format each course skill using the course skill JSON view
        const courseSkillsPayload = courseSkillsByCourseId.map(courseSkill => courseSkillJson(courseSkill.id, courseSkill.skill, courseSkill.courseId));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(courseSkillsPayload);
    }

    catch (err)
    {
        // Let the middleware do the error handling
        next(err);
    }
};