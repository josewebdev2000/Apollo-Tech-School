/** Container fro summary cards of about page */

function AboutSummaryCardsContainer({ children })
{
    return (
        <section className="py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Why Us?</h2>
                <p className="text-lg mt-2">At Apollo Tech School we&apos;ve been at your place before.</p>
                <p className="text-lg mt-2">Hence, we&apos;ve reformed the learning style in the way we had liked to learn when we started out.</p>
                <p className="text-lg mt-2">So you can reap the best results.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/** Summary Cards Go Here */}
                {children}
            </div>
        </section>
    );
}

export default AboutSummaryCardsContainer;