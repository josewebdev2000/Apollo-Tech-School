/** Overview of educational content bought by the user displayed in the MyLearning Page */

import { useState } from "react";
import { Link } from "react-router-dom";

function LearningCardOverview({ imgSource, imgAlt, cardTitle, cardDescription, detailsLink })
{
    // Check whether it's selected or not
    const [selected, setSelected] = useState(false);

    return (
        <div className={`relative bg-gray-800 rounded-lg p-3 shadow-md cursor-pointer transition-transform ${selected ? "ring-2 ring-green-500 scale-105" : "hover:scale-105"}`} onClick={() => setSelected(!selected)}>
            <img src={imgSource} alt={imgAlt} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-base font-medium text-white mt-2">{cardTitle}</h3>
            <p className="text-gray-400 text-xs">{cardDescription}</p>

            {/** Details Link */}
            <Link to={detailsLink} className="text-green-400 text-xs font-medium block mt-2 hover:underline">
                Continue Learning →
            </Link>
        </div>
    );
}

export default LearningCardOverview;