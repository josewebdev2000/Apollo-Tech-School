/** Handle all course packet related routes related to the Course Packet Entity*/

// Import Dependencies
const express = require("express");

// Import Controller for Course Packet Entity
const CoursePacketController = require("../controllers/coursepacket.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /course-packets

// Try out GET http://localhost:PORT/course-packets
router.get("/", CoursePacketController.getAllCoursePackets);

// Try out GET http://localhost:PORT/course-packets/:id
router.get("/:id", CoursePacketController.getCoursePacketById);

module.exports = router;
