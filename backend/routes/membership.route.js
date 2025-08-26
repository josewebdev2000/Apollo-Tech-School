// Handle all memberships

// Import Dependencies
const express = require("express");

// Import Controller for Membership Entity
const MembershipController = require("../controllers/membership.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /memberships

// Try out GET http://localhost:PORT/memberships
router.get("/", MembershipController.getAllMemberships);

// Try out GET http://localhost:PORT/memberships/:id
router.get("/:id", MembershipController.getMembershipById);

module.exports = router;