/** Routes for 'CourseRequirement' Entity */

// Import Dependencies
const express = require("express");

// Import Controller for CourseRequirement Entity
const courseRequirementController = require("../controllers/courserequirement.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /course-requirements

// Try out GET http://localhost:PORT/course-requirements/:courseId
router.get("/:courseId", courseRequirementController.getAllCourseRequirementsByCourseId);

module.exports = router;