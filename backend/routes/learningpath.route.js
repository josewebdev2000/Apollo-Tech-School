/** Handle all learning path routes related to the Learning Path Entity */

// Import Dependencies
const express = require("express");

// Import Controller for Learning Path Entity
const LearningPathController = require("../controllers/learningpath.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /learning-paths

// Try out GET http://localhost:PORT/learning-paths
router.get("/", LearningPathController.getAllLearningPaths);

// Try out GET http://localhost:PORT/learning-paths/:id
router.get("/:id", LearningPathController.getLearningPathById);

module.exports = router;