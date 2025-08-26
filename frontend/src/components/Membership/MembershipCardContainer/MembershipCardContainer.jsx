/** Membership Card Container 
 * Contains card for each membership plan
 */

function MembershipCardContainer({ children })
{
    return (
        <div className="flex flex-wrap justify-center items-center gap-8">
            {children}
        </div>
    );
}

export default MembershipCardContainer;