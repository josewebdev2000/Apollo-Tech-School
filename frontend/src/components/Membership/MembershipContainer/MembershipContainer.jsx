/** Container of UI components of the membership page */

function MembershipContainer({ children })
{
    return (
        <section className="membership py-16 bg-gray-800">
            <div className="container mx-auto max-w-6xl text-center text-white">
                {children}
            </div>
        </section>
    );
}

export default MembershipContainer;