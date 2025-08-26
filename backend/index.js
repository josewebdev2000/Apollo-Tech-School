/** Main Script for the Whole Back-End Server */

// Import dependencies
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const { 
    associateModels,
    Category,
    CoursePacket,
    LearningPath,
    Role,
    Membership,
    User,
    Course,
    CourseModule,
    CourseRequirement,
    CourseReview,
    CourseSkill,
 } = require("./models/index.model");

// Import Error Handler for Middleware
const errorHandler = require("./middleware/errorHandler"); 

// Import Routers
const { 
    CategoryRouter, 
    CourseRouter, 
    LearningPathRouter, 
    CoursePacketRouter, 
    MembershipRouter, 
    UserRouter, 
    CourseModulesRouter, 
    CourseSkillsRouter,
    CourseRequirementRouter,
    CourseReviewRouter
 } = require("./routes/index.route");

// Grab Port to run app
const PORT = process.env.PORT;

// Create Express App
const app = express();

// Allow CORS
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));

// Let read URL parameters from requests
app.use(express.urlencoded({ extended: false }));

// Set up JSON usage
app.use(express.json());

// Allow Cookie Parsing
app.use(cookieParser());

// Associate Models
associateModels();

// Sync the Sequelize models with the MySQL DB
(async () => {
    try
    {
        await sequelize.sync({ force: false, alter: false });
        console.log("Database synced successfully");
    }

    catch (err)
    {
        console.error("Error syncing database:", err);
    }
})();

// Incorporate Routes in Express
app.use("/categories", CategoryRouter);
app.use("/courses", CourseRouter);
app.use("/course-modules", CourseModulesRouter);
app.use("/course-skills", CourseSkillsRouter);
app.use("/course-requirements", CourseRequirementRouter);
app.use("/course-reviews", CourseReviewRouter);
app.use("/learning-paths", LearningPathRouter);
app.use("/course-packets", CoursePacketRouter);
app.use("/memberships", MembershipRouter);
app.use("/user", UserRouter);

// Use Error Handling
app.use(errorHandler);

// Run the Express App
app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
});