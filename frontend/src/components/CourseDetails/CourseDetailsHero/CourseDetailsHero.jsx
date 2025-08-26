/** Hero of Course Details Includes Title, Review, and Call To Action */


function CourseDetailsHero({ courseName, courseRating, courseNumReviews, imgSource, imgAlt, coursePrice })
{
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-white">{courseName}</h1>
            <div className="mt-6">
                <img src={imgSource} alt={imgAlt} width={500} className="mx-auto rounded-lg shadow-lg" />
            </div>
            <div className="text-5xl font-bold text-white mt-6">
                
            </div>
        </div>
    );
}

export default CourseDetailsHero;