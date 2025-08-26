/** Container of Featured Cards in the About Page */

function AboutFeaturedCardsContainer({ children })
{
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">What Sets Us Apart</h2>
                <p className="text-lg mt-2">Explore the unique features that make learning with us a breeze.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {children}
            </div>
        </section>
    );
}

export default AboutFeaturedCardsContainer;