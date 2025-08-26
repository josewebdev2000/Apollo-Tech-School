/** Controller for the Category Model */
require("dotenv").config();
const { Category } = require("../models/index.model");

const HTTPCodes = require("../helpers/http_codes.helper");

const { isValidIdFormat } = require("../helpers/funcs.helper");

// Request for category Json View
const { categoryJson } = require("../json/index.json");
const { EntityNotFoundError, ValidationError } = require("../errors/index.error");

// Get All Categories
exports.getAllCategories = async(req, res, next) => {

    try
    {
        // Get all categories from the DB
        const categories = await Category.findAllCategories();

        // Format each category using the category JSON Payload Function
        const categoryPayloads = categories.map(cat => categoryJson(cat.id, cat.name));

        // Return JSON response
        return res.status(HTTPCodes.Ok).json(categoryPayloads);
    }

    catch (err)
    {
        // Pass any unexpected error to the error handling middleware
        next(err);
    }
};

// Get Category By Id
exports.getCategoryById = async (req, res, next) => {

    try
    {
        // Grab JSON data with the requested ID
        const { id } = req.params;

        // Validate the ID
        if (!isValidIdFormat(id))
        {
            throw new ValidationError("Category ID must be a positive whole number");
        }

        // Grab Category associated to the given id
        const category = await Category.findCategoryById(id);

        // If not found, throw error
        if (!category)
        {
            throw new EntityNotFoundError(`Category of id ${id} could not be found`);
        }

        // Form the Category Json Payload
        const categoryJsonPayload = categoryJson(category.id, category.name);

        // Return category JSON payload
        return res.status(HTTPCodes.Ok).json(categoryJsonPayload);
    }

    catch (err)
    {
        // Let the middleware handle the error
        next(err);
    }
};
