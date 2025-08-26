/** React Component for the Home Page */
import { useState, useEffect } from "react";

import HomeHero from "../../components/Home/HomeHero";
import HomeCardContainer from "../../components/Home/HomeCardContainer";
import CardOverview from "../../components/CardOverview/CardOverview";

// Import Base Client
import baseClient from "../../api/baseClient";

function Home()
{
    // Load Courses
    const [courses, setCourses] = useState([]);
    const [courseLoading, setCourseLoading] = useState(true);
    const [courseError, setCourseError] = useState(null);

    // Load Course Packets
    const [coursePackets, setCoursePackets] = useState([]);
    const [coursePacketLoading, setCoursePacketLoading] = useState(true);
    const [coursePacketError, setCoursePacketError] = useState(null);

    // Load Learning Paths
    const [learningPaths, setLearningPaths] = useState([]);
    const [learningPathsLoading, setLearningPathsLoading] = useState(true);
    const [learningPathsError, setLearningPathsError] = useState(null);

    useEffect(() => {

        const fetchCourses = async () => {

            try
            {
                const res = await baseClient.get("/courses");
                setCourses(res.data);
            }

            catch (err)
            {
                setCourseError(err.message);
            }

            finally
            {
                setCourseLoading(false);
            }
        };

        const fetchCoursePackets = async () => {

            try
            {
                const res = await baseClient.get("/course-packets");
                setCoursePackets(res.data);
            }

            catch (err)
            {
                setCoursePacketError(err.error);
            }

            finally
            {
                setCoursePacketLoading(false);
            }
        };

        const fetchLearningPaths = async () => {

            try
            {
                const res = await baseClient.get("/learning-paths");
                setLearningPaths(res.data);
            }

            catch (err)
            {
                setLearningPathsError(err.error);
            }

            finally
            {
                setLearningPathsLoading(false);
            }
        };

        fetchCourses();
        fetchCoursePackets();
        fetchLearningPaths();
    }, []);

    return (
        <div className="home-page">
            <HomeHero
                heroTypeClass={"hero"}
                heroBgColor1={"from-indigo-800"}
                heroBgColor2={"to-indigo-600"}
                title={"Welcome to Apollo-Tech School"}
                content={"Empowering your tech career with expert-led courses"}
                btnText={"Choose Your Membership Plan"}
                btnBgColor1={"bg-purple-600"}
                btnBgHoverColor={"bg-purple-500"}
            />

            {/** Courses Card Container */}
            <HomeCardContainer
                childTypeClass={"courses"}
                bgColorClass={"bg-gray-900"}
                containerTitle={"Popular Courses"}
                containerTitleColorClass={"text-gray-300"}
            >
                {
                    // Loading State Component
                    (courseLoading) ? <p>Loading Courses ...</p>
                    : ((courseError) ? <p>Error: {courseError}</p> : (
                        courses.map(course => (
                            <CardOverview
                                cardTypeClass={"course-card"}
                                bgColorClass={"bg-gray-800"}
                                imgSource={course.picUrl}
                                imgAlt={course.description}
                                cardTitle={course.title}
                                cardDescription={course.description}
                                detailsLink={`/course/${course.id}`}
                                courseLevel={course.level.toLowerCase()}
                                key={course.id}
                            />
                        ))
                    ))
                }
            </HomeCardContainer>

            {/** Course Packets Card Container */}
            <HomeCardContainer
                childTypeClass={"course-packets"}
                bgColorClass={"bg-gray-800"}
                containerTitle={"Popular Course Packets"}
                containerTitleColorClass={"text-gray-200"}
            >
                {
                    (coursePacketLoading) ? <p>Loading Course Packets ...</p>
                    : ((coursePacketError) ? <p>Error: {coursePacketError}</p>:
                (
                    coursePackets.map(coursePacket => (
                        <CardOverview
                            cardTypeClass={"packet-card"}
                            bgColorClass={"bg-gray-700"}
                            imgSource={coursePacket.picUrl}
                            imgAlt={coursePacket.description}
                            cardTitle={coursePacket.title}
                            cardDescription={coursePacket.description}
                            detailsLink={"#"}
                            key={coursePacket.id}
                        />
                    ))
                ))
                }
            </HomeCardContainer>

            {/**Learning Paths Card Container */}
            <HomeCardContainer
                childTypeClass={"learning-paths"}
                bgColorClass={"bg-gray-900"}
                containerTitle={"Popular Learning Paths"}
                containerTitleColorClass={"text-gray-100"}
            >
                {
                    (learningPathsLoading) ? <p>Loading Learning Paths ...</p>
                    : ((learningPathsError) ? <p>Error: {learningPathsError}</p>: 
                        (
                            learningPaths.map(learningPath => (
                                <CardOverview
                                    cardTypeClass={"path-card"}
                                    bgColorClass={"bg-blue-800"}
                                    imgSource={learningPath.picUrl}
                                    imgAlt={learningPath.description}
                                    cardTitle={learningPath.title}
                                    cardDescription={learningPath.description}
                                    detailsLink={"#"}
                                    key={learningPath.id}
                                />
                            ))
                        )
                    )
                }
            </HomeCardContainer>
            <HomeHero
                heroTypeClass={"membership"}
                heroBgColor1={"from-purple-800"}
                heroBgColor2={"to-purple-600"}
                btnBgColor1={"bg-yellow-500"}
                btnBgHoverColor={"btn-yellow-400"}
                btnColor={"text-black"}
                title={"Ready to Start Learning?"}
                content={"Choose a membership plan that suits you"}
                btnText={"Explore Membership Plans"}
            />
        </div>
    );
}

export default Home;