/** Component for Profile Settings Page */
import { useState, useEffect, useContext } from "react";
import baseClient from "../../../api/baseClient";
import { UserContext } from "../../../context/UserContext";
import MembershipCard from "../../../components/Membership/MembershipCard/MembershipCard";
import ImageGrid from "../../../components/ProfileSettings/ImageGrid/ImageGrid";
import { Link, useNavigate } from "react-router-dom";
import avatars from "../../../data/avatars";

function ProfileSettings()
{
    // Grab the user
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    // Grab the user id
    const userId = user.id;

    // Check if the user has a membership first
    const [userMembership, setUserMembership] = useState(null);
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
        const [selectedImage, setSelectedImage] = useState(
        avatars.find(img => img.src === user.picUrl) || avatars[0]
    );

    useEffect(() => {
        // Perform GET Request to get user membership
        const fetchUserMembership = async () => {
            try
            {
                const res = await baseClient.get(`/memberships/${user.membershipId}`);
                setUserMembership(res.data);
            }

            catch (err)
            {
                setUserMembership(null);
            }

            finally
            {
                setLoading(false);
            }
        };

        fetchUserMembership();
    }, []);

    // Submit request to update user first and last name
    const handleUpdateNameSubmit = async e => {
        e.preventDefault();
        setErrorMessage("");

        // Build payload to update user first and last name
        const updateUserPayload = {
            firstName,
            lastName,
        };

        try
        {
            const res = await baseClient.put("/user/updateNames", updateUserPayload);
            setUser(res.data);
        }

        catch (err)
        {
            setErrorMessage(err.message || "An error occurred while updating user first and last names");
        }
    };

    // Submit request to update user profile picture
    const handleUpdateProfilePicture = async e => {
        e.preventDefault();
        setErrorMessage("");

        // Build payload to update user profile picture
        const updateUserProfilePicture = {
            picUrl: selectedImage.src
        };

        try
        {
            const res = await baseClient.put("/user/updatePicUrl", updateUserProfilePicture);
            setUser(res.data);
        }

        catch (err)
        {
            setErrorMessage(err.message || "An error occurred while updating user profile picture");
        }
    };

    return (
        <div className="p-6 bg-slate-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

            {/**Update Names */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-4">Update Names</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium">First Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-slate-700 text-white rounded-md"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <button
                            onClick={handleUpdateNameSubmit}
                            type="submit"
                            className="mt-4 w-full md:w-auto bg-blue-600 hover:blue-700 px-6 py-2 rounded-md font-semibold transition"
                        >Save Changes</button>
                    </div>
                    <span className="bg-red-500 hover:bg-red-600">{errorMessage}</span>
                </form>
            </div>

            {/** Update Images */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-4">Update Profile Picture</h2>
                <ImageGrid
                    images={avatars}
                    selectedImage={selectedImage}
                    onSelect={(img) => setSelectedImage(img)}
                />
                <div className="md:col-span-2">
                    <button
                        onClick={handleUpdateProfilePicture}
                        type="submit"
                        className="mt-4 w-full md:w-auto bg-blue-600 hover:blue-700 px-6 py-2 rounded-md font-semibold transition"
                    >Save Changes</button>
                </div>
            </div>

            {/** Membership Section */}
            <div className="m-auto">
                <h2 className="text-2xl font-bold mb-4">Your Membership</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {
                        userMembership != null
                        ?
                        (
                            <MembershipCard
                                title={userMembership.title}
                                description={userMembership.description}
                                price={userMembership.price}
                                showLink={false}
                            />
                        )
                        :
                        (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <h2 className="text-2xl font-bold mb-4">You are not enrolled to any membership plan</h2>
                                <Link className="btn-secondary bg-blue-600 text-white py-2 px-4 rounded-lg hvoer:bg-blue-700 transition duration-300" to={"/memberships"}>Join Now</Link>
                            </div>
                        )
                    }
                </div>
                {
                    userMembership != null
                    ?
                    (
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg font-semibold text-slate-900" to={"/memberships"}>
                                Change Membership
                            </Link>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
        </div>
    );
}

export default ProfileSettings;