/** React Component for the Membership Page */

import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../context/UserContext";
import MembershipContainer from "../../components/Membership/MembershipContainer/MembershipContainer";
import MembershipCardContainer from "../../components/Membership/MembershipCardContainer/MembershipCardContainer";
import MembershipCard from "../../components/Membership/MembershipCard/MembershipCard";
import MembershipHero from "../../components/Membership/MembershipHero/MembershipHero";

import baseClient from "../../api/baseClient";

function Membership()
{
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchMemberships = async () => {
            try
            {
                const res = await baseClient.get("/memberships");
                setMemberships(res.data);
            }

            catch (err)
            {
                console.error(err);
                setError(err.message);
            }

            finally
            {
                setLoading(false);
            }
        };

        fetchMemberships();

    }, []);

    return (
        <MembershipContainer>
            <MembershipHero />
            <MembershipCardContainer>
                {
                    (loading) ? <p>Loading ...</p>
                    : ((error) ? <p>Error: {error}</p>: 
                (
                    memberships.map(membership => (
                        <MembershipCard
                            id={membership.id}
                            title={membership.title}
                            description={membership.description}
                            price={membership.price}
                            key={membership.id}
                        />
                    ))
                ))
                }
            </MembershipCardContainer>
        </MembershipContainer>
    );
}

export default Membership;