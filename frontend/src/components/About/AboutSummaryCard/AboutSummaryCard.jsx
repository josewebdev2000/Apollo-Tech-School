/** Summary Card to show details about the platform in the About Page */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faClock, faCertificate, faTools} from "@fortawesome/free-solid-svg-icons";

function AboutSummaryCard({faIconName, title, content})
{
    return (
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
            {
                faIconName == "faChalkboardTeacher" && <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-blue-400 mb-4"/>
            }
            {
                faIconName == "faClock" && <FontAwesomeIcon icon={faClock} className="text-4xl text-blue-400 mb-4" />
            }
            {
                faIconName == "faCertificate" && <FontAwesomeIcon icon={faCertificate} className="text-4xl text-blue-400 mb-4" />
            }
            {
                faIconName == "faTools" && <FontAwesomeIcon icon={faTools} className="text-4xl text-blue-400 mb-4" />
            }
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default AboutSummaryCard;