/** Handle all routes related to the Course Entity */

// Import Dependencies
const express = require("express");

// Import Controller for Course Entity
const CourseController = require("../controllers/course.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /courses

// Try out GET http://localhost:PORT/courses
router.get("/", CourseController.getAllCourses);

// Try out GET http://localhost:PORT/courses/:id
router.get("/:id", CourseController.getCourseById);

module.exports = router;