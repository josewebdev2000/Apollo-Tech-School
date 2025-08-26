/** Controller for the 'CourseReview' Entity */
require("dotenv").config();

const { Course, CourseReview } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");
const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for Course Review JSON View
const { courseReviewJson } = require("../json/coursereview.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Course Reviews of Course By Id
exports.getAllCourseReviewsByCourseId = async (req, res, next) => {

    try
    {
        // Grab req param data with ID
        const { courseId } = req.params;

        // Validate the ID
        if (!isValidIdFormat(courseId))
        {
            throw new ValidationError("Course ID must be positive whole number");
        }

        // Grab course associated to the given id
        const course = await Course.findCourseById(courseId);

        // If not found, throw error
        if (!course)
        {
            throw new EntityNotFoundError(`Course of id ${courseId} could not be found`);
        }

        // Now grab all the course Reviews that have the courseId
        const courseReviewsByCourseId = await CourseReview.findAllCourseReviewsByCourseId(course.id);

        // Format each course review using the course JSON Payload
        const courseReviewsPayloads = courseReviewsByCourseId.map(courseReview => courseReviewJson(courseReview.id, courseReview.name, courseReview.picUrl, courseReview.occupation, courseReview.description, courseReview.courseId, courseReview.userId, courseReview.rating));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(courseReviewsPayloads);
    }

    catch (err)
    {
        // Let the middleware handle errors
        next(err);
    }
};