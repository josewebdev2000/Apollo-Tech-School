import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { isMobile, isTablet } from "react-device-detect";

function getRightEventBasedOnDevice(desktopEvent, mobileEvent)
{
    return isMobile || isTablet ? mobileEvent : desktopEvent;
}

function Navbar()
{
    // Set variable to open mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const onClickDropdownToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const [userIconLink, setUserIconLink] = useState(null);
    
    // Make sure to block the user icon when the user is logged in
    const { user } = useContext(UserContext);

    useEffect(() => {
        user.id ? setUserIconLink("/dashboard/mylearning") : setUserIconLink("/login")
    }, [user]);

    return (
        <nav className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
            <div className="logo flex items-center space-x-2">
                <FontAwesomeIcon icon={faDesktop} className="text-3xl" />
                <h1 className="text-2xl font-bold font-poppins">Apollo Tech School</h1>
            </div>

            <ul className="hidden md:flex md:space-x-8 font-inter text-lg">
                <li><Link to="/" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>Home</Link></li>
                <li><Link to="/about" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>About</Link></li>
                <li><Link to="/memberships" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>Membership</Link></li>
            </ul>

            <div className="hidden md:flex items-center space-x-2 p-2 rounded-lg">
                <input type="text" className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out" placeholder="Search courses..." />
                <button className={`bg-purple-500 text-white px-4 py-2 rounded-lg ${getRightEventBasedOnDevice("hover", "active")}:bg-purple-400 transition-all duration-300 ease-in-out`}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className="hidden md:flex">
                <Link to={userIconLink} className="hover:text-blue-400 transition-colors duration-300 ease-in-out">
                    {user.id ? <img className="object-cover w-12 opacity-100 hover:opacity-50 transition-all ease-in-out duration-300" src={user.picUrl} alt={`${user.firstName} ${user.lastName} Profile Picture`}/> : <FontAwesomeIcon icon={faUser} className="text-2xl"/>}
                </Link>
            </div>

            <button id="menu-btn" className="block md:hidden hover:text-blue-400 transition-colors duration-300 ease-in-out">
                <FontAwesomeIcon icon={faBars} className="text-2xl" onClick={onClickDropdownToggle} />
            </button>

            <div id="mobile-menu" className={`absolute md:hidden top-10 left-0 w-full bg-gray-900 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-1' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
                <ul className="flex flex-col space-y-4 font-inter text-lg p-4">
                    <li><Link to="/" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>Home</Link></li>
                    <li><Link to="/about" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>About</Link></li>
                    <li><Link to="/memberships" className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>Memberships</Link></li>
                    <li>
                        <Link to={userIconLink} className={`${getRightEventBasedOnDevice("hover", "active")}:text-blue-400 transition-colors duration-300 ease-in-out`}>
                            {user.id ? <img className="object-cover w-12 opacity-100 hover:opacity-50 transition-all ease-in-out duration-300" src={user.picUrl} alt={`${user.firstName} ${user.lastName} Profile Picture`}/> : <FontAwesomeIcon icon={faUser} className="text-2xl"/>}
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center space-x-2 rounded-lg">
                            <input type="text" className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out" placeholder="Search courses..."/>
                            <button className={`bg-purple-500 text-white px-4 py-2 rounded-lg ${getRightEventBasedOnDevice("hover", "active")}:bg-purple-400 transition-all duration-300 ease-in-out`}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );


}

export default Navbar;