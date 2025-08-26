/** All Routes Related to the "User" Entity */

// Import Dependencies
const express = require("express");
const UserController = require("../controllers/user.controller");

// AuthChecker Middleware
const authChecker = require("../middleware/authChecker");

// Create a router instance
const router =  express.Router();

// Configure HTTP Routes for /user

// Try out GET http://localhost:PORT/user/:id/membership
router.get("/membership", authChecker, UserController.getUserMembership);

// Try out POST http://localhost:PORT/user/register
router.post("/register", UserController.register);

// Try out POST http://localhost:PORT/user/login
router.post("/login", UserController.login);

// Try out POST http://localhost:PORT/user/logout
router.post("/logout", UserController.logout);

// Try out PUT http://localhost:PORT/user/updateNames
router.put("/updateNames", authChecker, UserController.updateNames);

// Try out PUT http://localhost:PORT/user/updatePicUrl
router.put("/updatePicUrl", authChecker, UserController.updatePicUrl);

// Try out PATCH http://localhost:PORT/user/enrollToMembership
router.patch("/enrollToMembership", authChecker, UserController.enrollInMembership);

// Try out PATCH http://localhost:PORT/user/deenrollFromMembership
router.patch("/deenrollFromMembership", authChecker, UserController.deenrollFromMembership);

module.exports = router;