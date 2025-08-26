/** Routes for 'CourseReview' Entity */

// Import Dependencies
const express = require("express");

// Import Controller for CourseReview Entity
const courseReviewController = require("../controllers/coursereview.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /course-reviews

// Try out GET http://localhost:PORT/course-reviews/:courseId
router.get("/:courseId", courseReviewController.getAllCourseReviewsByCourseId);

module.exports = router;