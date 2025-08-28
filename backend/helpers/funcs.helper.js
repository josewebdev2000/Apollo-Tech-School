/** Common Functions to be used throughout the whole backend */
const jwt = require("jsonwebtoken");

function isValidIdFormat(id)
{
    // Return true if a positive whole number was provided
    if (isNaN(id))
    {
        return false;
    }

    return id > 0;
}

function getTodaysDate()
{
    const today = new Date();

    // Format the date in Month/Day Number/year
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return today.toLocaleDateString("en-US", options);
}

function isFirstDateAfterSecondDate(firstDate, secondDate)
{
    // Return true if first date comes after the second
    // Grab time of both firstDate and secondDate
    const firstDateTime = firstDate.getTime();
    const secondDateTime = secondDate.getTime();

    return firstDateTime > secondDateTime;
}

function verifyJwt(token, secret)
{
    // Check if a JWT is valid or invalid
    try
    {
        jwt.verify(token, secret);

        return {
            message: "JWT Token is valid"
        };
    }

    catch
    {
        return {
            error: "JWT Token is invalid"
        }
    }
}

function generateUniqueRandomPin()
{
    const min = 100000; // Minimum 6-Digit Number
    const max = 999999; // Maximum 6-Digit Number

    // Declare PIN Code
    const pin = Math.floor(Math.random() * (max - min + 1)) + min;

    // Return the new pin in String format
    return pin.toString();
}

function isWithinTheLast15Mins(date)
{
    const now = new Date();
    const fifteenMinsAgo = new Date(now.getTime() - 15 * 60 * 1000);

    return date >= fifteenMinsAgo && date <= now;
}

module.exports = {
    isValidIdFormat,
    getTodaysDate,
    isFirstDateAfterSecondDate,
    verifyJwt,
    generateUniqueRandomPin,
    isWithinTheLast15Mins
};

