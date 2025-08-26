/** Students Review Section of Course Details */

function StudentsReviewContainer({ children })
{
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Students Review</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
                {children}
            </div>
        </div>
    );
}

export default StudentsReviewContainer;