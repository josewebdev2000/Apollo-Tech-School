/** Code of MyLearning Page where user can interact with the courses enrolled */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import LearningCardOverview from "../../../components/MyLearning/LearningCardOverview/LearningCardOverview";
import baseClient from "../../../api/baseClient";
import { UserContext } from "../../../context/UserContext";

function MyLearning()
{
    const [coursesEnrolled, setCoursesEnrolled] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(UserContext);

    // Try to load the courses the user is enrolled to
    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try
            {
                const res = await baseClient.get(`/courses/user/${user.id}`);
                setCoursesEnrolled(res.data);
            }

            catch (err)
            {
                setError("You have not enrolled to any courses yet");
            }

            finally
            {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div className="p-6 bg-slate-900 text-white">
            <h1 className="text-3xl font-bold mb-6">My Learning</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/** Courses */}
                {
                    (loading) ? <p>Loading...</p>
                    : ((error) ? <p>Error: {error}</p>:(
                        coursesEnrolled.length == 0 ? (
                            <div>
                                <h3 className="text-2xl font-bold mb-4">You are enrolled in no courses</h3>
                                <Link className="btn btn-success bg-green-500 rounded-full hover:bg-green-600 btn-lg" to={"/"}>Browse Courses</Link>
                            </div>
                        ) : (
                            coursesEnrolled.map(courseEnrolled => (
                                <LearningCardOverview
                                    imgSource={courseEnrolled.picUrl}
                                    imgAlt={courseEnrolled.description}
                                    cardTitle={courseEnrolled.title}
                                    detailsLink={`/course/${coursesEnrolled.id}`}
                                    key={coursesEnrolled.id}
                                />
                            ))
                        )
                    ))
                }
            </div>
        </div>
    );
}

export default MyLearning;
