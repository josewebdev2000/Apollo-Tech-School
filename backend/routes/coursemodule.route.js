/** Routes for 'CourseModule' Entity */

// Import Dependencies
const express = require("express");

// Import Controller for Course Entity
const CourseModuleController = require("../controllers/coursemodule.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /course-modules

// Try out GET http://localhost:PORT/course-modules/:courseId
router.get("/:courseId", CourseModuleController.getAllCourseModulesByCourseId);

module.exports = router;