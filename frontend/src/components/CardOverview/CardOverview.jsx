/** Card component meant to show a product overview */
import { Link } from "react-router-dom";

function CardOverview({ cardTypeClass, bgColorClass, imgSource, imgAlt, cardTitle, cardDescription, detailsLink, courseLevel=null, category=null })
{
    return (
        <div className={`${cardTypeClass} ${bgColorClass} p-4 rounded-lg shadow-lg`}>
            <img src={imgSource} alt={imgAlt} width="300" height="200" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-2">{cardTitle}</h3>
            <p className="text-gray-400 mb-4">{cardDescription}</p>
            <Link to={detailsLink} className="btn-secondary bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-400 active:bg-purple-300">
                View Details
            </Link>
            {
                courseLevel == "beginner" && (
                    <span className="badge badge-success relative bottom-0 left-20 text-white text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-125">Beginner</span>
                )
            }
            {
                courseLevel == "intermediate" && (
                    <span className="badge badge-warning relative bottom-0 left-20 text-white text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-125">Intermediate</span>
                )
            }
            {
                courseLevel == "advanced" && (
                    <span className="badge badge-info relative bottom-0 left-20 text-white text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-125">Advanced</span>
                )
            }
        </div>
    );
}

export default CardOverview;