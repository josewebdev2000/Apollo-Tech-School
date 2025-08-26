/** Handle all routes related to the Category Entity */

// Import Dependencies
const express = require("express");

// Import Controller for Category Entity
const CategoryController = require("../controllers/category.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /categories

// Try out a GET http://localhost:PORT/categories
router.get("/", CategoryController.getAllCategories);

// Try out a GET http://localhost:PORT/categories/:id
router.get("/:id", CategoryController.getCategoryById);

module.exports = router;