/** A particular skill outlined in course details section */

import GreenTick from "../../Icons/GreenTick/GreenTick";

function CourseDetailsSkill({ skill })
{
    return (
        <div className="flex items-center space-x-4">
            <GreenTick />
            <p className="text-gray-300">{skill}</p>
        </div>
    );
}

export default CourseDetailsSkill;