// Error Handler to return error responses

function errorHandler(err, req, res, next)
{
    // Show the error in the console so it can be debugged
    console.error(err);

    // Display the error or a 500 Internal Server Error
    const statusCode = err.httpCode || 500;
    const message = err.message || "Internal Server Error";

    // Return the JSON view of the error
    return res.status(statusCode).json({
        success: false,
        message
    });
}

module.exports = errorHandler;