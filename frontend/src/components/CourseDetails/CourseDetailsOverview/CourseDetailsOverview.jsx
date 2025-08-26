/** Course Details Overview */
import { useState, useEffect } from "react";

function CourseDetailsOverview({ courseDescription, courseDuration, courseLevel })
{
    const [courseColor, setCourseColor] = useState("badge-success");

    useEffect(() => {
        if (courseLevel.toLowerCase() == "beginner")
        {
            setCourseColor("badge-success");
        }

        else if (courseLevel.toLowerCase() == "intermediate")
        {
            setCourseColor("badge-warning");
        }

        else
        {
            setCourseColor("badge-info");
        }
    }, []);

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-semibold text-white">Course Overview</h2>
            <p className="text-lg text-gray-300 mt-4">{courseDescription}</p>
            <div className="mt-4">
                <span className="text-gray-400">Level: <span className={`badge ${courseColor} relative bottom-0 left-2 text-white text-sm font-semibold`}>{courseLevel}</span></span>
            </div>
        </div>
    );
}

export default CourseDetailsOverview;