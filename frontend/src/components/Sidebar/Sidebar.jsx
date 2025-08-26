/** Sidebar the authenticated user will see upon registration /loggin in */

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faCog, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import baseClient from "../../api/baseClient";

function Sidebar()
{
    // Placeholders for dynamic data that will be fed later on

    // Import user and the ability to change it
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    // Control if the sidebar should be opened or not
    const [isOpen, setIsOpen] = useState(true);

    // Form the name of the user
    const name = `${user.firstName} ${user.lastName}`;

    // Prepare Logout Request
    const logout = async () => {
        
        try
        {
            await baseClient.post("/user/logout");
        }

        catch (err)
        {
            console.error("Logout failed");
            setError(err.response?.data?.message || "An error occurred");
        }

        finally
        {
            // No matter what happens, remove the user from the context in regards to the front-end to avoid bugs
            setUser({"user": null});
        }
    };

    return (
        <div className={`h-screen bg-slate-800 text-gray-300 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
            {/** Control Sidebar Collapse */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 m-2 text-xl focus:outline-none text-gray-300"
            >
                <FontAwesomeIcon icon={faBars}/>
            </button>

            {/** User Profile */}
            <div className="flex flex-col items-center py-4">
                {/** This will later be replaced by a picture */}
                <div className="w-16 h-16 bg-gray-500 rounded-full flex justify-center align-items-center">
                    <img src={user.picUrl} alt={`${user.firstName} ${user.lastName} Profile Picture`}/>
                </div>
                {isOpen && <p className="mt-2 text-lg font-bold text-white">{name}</p>}
            </div>

            {/** Navigation Links */}
            <nav className="mt-4">
                <ul className="space-y-2">
                    <li>
                        {/** Go to My Learning Page */}
                        <Link to={"mylearning"} className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
                            <FontAwesomeIcon icon={faBook} className="mr-2 text-white" />
                            {isOpen && <span className="text-gray-300">My Learning</span>}
                        </Link>
                    </li>
                    <li>
                        {/** Go to the Profile Settings Page */}
                        <Link to={"settings"} className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
                            <FontAwesomeIcon icon={faCog} className="mr-2 text-white" />
                            {isOpen && <span className="text-gray-300">Profile Settings</span>}
                        </Link>
                    </li>
                    <li>
                        {/** Log out from the application */}
                        <Link to={"/"} onClick={logout} className="flex items-center p-3 hover:bg-red-600 rounded-lg">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-white" />
                            {isOpen && <span className="text-gray-300">Logout</span>}
                            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;