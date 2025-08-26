/** Membership Card React UI Component
 * Represents a membership card and displays the data it has
 */

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import baseClient from "../../../api/baseClient";

function MembershipCard({ id, title, description, price, showLink = true })
{

    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const selectedNow = user.membershipId === id;

    // Add User To Membership Plan On Click
    const addUserToMembershipOnClick = () => {

        // Set Loading to true
        setLoading(true);

        // Make payload with this membership id
        const addPayload = {
            membershipId: id
        };

        const addPayloadRequest = async () => {

            try
            {
                if (user.membershipId !== null)
                {
                    await baseClient.patch("/user/deenrollFromMembership");
                    setUser({...user, membershipId: null});
                }

                const enrollmentRes = await baseClient.patch("/user/enrollToMembership", addPayload);
                const { membershipId } = enrollmentRes.data;
                
                // Set user membership to given membership
                setUser({...user, membershipId: membershipId});
            }

            catch (err)
            {
                setUser(user);
            }

            finally
            {
                setLoading(false);
            }
        };

        addPayloadRequest();
    };

    // Remove User From Membership Plan On Click
    const deleteUserFromMembershipOnClick = () => {

        setLoading(true);

        const deletePayloadRequest = async () => {
            try
            {
                await baseClient.patch("/user/deenrollFromMembership");
                setUser({...user, membershipId: null});
            }

            catch (err)
            {
                setUser(user);
            }

            finally
            {
                setLoading(false);
            }
        };

        deletePayloadRequest();
    };

    return (
        <div className="membership-card bg-gray-800 border-2 border-yellow-500 p-6 rounded-lg shadow-lg text-center w-72">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-200">{title}</h3>
            <p className="text-xl text-yellow-300 mb-4">{description}</p>
            <div className="text-3xl font-bold text-yellow-400 mb-4">${price}</div>

            {/** Work on links based on users later on */}
            {showLink && !selectedNow && user.id === undefined && (
                <Link className="btn-secondary bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" to={"/login"}>
                    {
                        loading ? <span className="loading loading-spinner loading-md"></span> : <span>Join Now</span>
                    }
                </Link>
            )}

            {
                showLink && !selectedNow && user.id !== undefined && (
                    <button className="btn-secondary bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={addUserToMembershipOnClick}>
                        {
                            loading ? <span className="loading loading-spinner loading-md"></span> : <span>Enroll</span>
                        }
                    </button>
                )
            }

            {
                showLink && selectedNow && (
                    <button className="btn-secondary bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300" onClick={deleteUserFromMembershipOnClick}>
                        {
                            loading ? <span className="loading loading-spinner loading-md"></span> : <span>Un-Enroll</span>
                        }
                    </button>
                )
            }

        </div>
    );
}

export default MembershipCard;