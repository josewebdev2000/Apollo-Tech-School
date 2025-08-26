/** Routes for 'CourseModules' Entity */

// Import Dependencies
const express = require("express");

// Import Controller for CourseSkill Entity
const courseSkillController = require("../controllers/courseskill.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /course-skills

// Try out GET http://localhost:PORT/course-skills/:courseId
router.get("/:courseId", courseSkillController.getAllCourseSkillsModulesByCourseId);

module.exports = router;