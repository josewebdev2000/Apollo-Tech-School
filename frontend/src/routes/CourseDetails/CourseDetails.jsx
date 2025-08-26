/** React Component for the Course Details Page */
import CourseDetailsHero from "../../components/CourseDetails/CourseDetailsHero/CourseDetailsHero";
import CourseDetailsOverview from "../../components/CourseDetails/CourseDetailsOverview/CourseDetailsOverview";
import CourseDetailsSkill from "../../components/CourseDetails/CourseDetailsSkill/CourseDetailsSkill";
import CourseDetailsSkillsContainer from "../../components/CourseDetails/CourseDetailsSkillsContainer/CourseDetailsSkillsContainer";
import CourseDetailsSyllabus from "../../components/CourseDetails/CourseDetailsSyllabus/CourseDetailsSyllabus";
import CourseDetailsSyllabysModule from "../../components/CourseDetails/CourseDetailsSyllabusModule/CourseDetailsSyllabusModule";
import CourseRequirement from "../../components/CourseDetails/CourseRequirement/CourseRequirement";
import CourseRequirementsContainer from "../../components/CourseDetails/CourseRequirementsContainer/CourseRequirementsContainer";
import StudentReview from "../../components/CourseDetails/StudentReview/StudentReview";
import StudentReviewContainer from "../../components/CourseDetails/StudentsReviewContainer/StudentsReviewContainer";

import { useParams, useNavigate } from "react-router-dom";

// Use Hooks
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import baseClient from "../../api/baseClient";

function CourseDetails()
{
    const { courseId } = useParams();

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    // const [isUserEnrolled, setIsUserEnrolled] = useState(false);

    const [course, setCourse] = useState(null);
    const [courseLoading, setCourseLoading] = useState(true);
    const [courseError, setCourseError] = useState(null);

    const [courseModules, setCourseModules] = useState(null);
    const [courseModulesLoading, setCourseModulesLoading] = useState(true);
    const [courseModulesError, setCourseModulesError] = useState(null);

    const [courseSkills, setCourseSkills] = useState(null);
    const [courseSkillsLoading, setCourseSkillsLoading] = useState(true);
    const [courseSkillsError, setCourseSkillsError] = useState(null);

    const [courseRequirements, setCourseRequirements] = useState(null);
    const [courseRequirementsLoading, setCourseRequirementsLoading] = useState(true);
    const [courseRequirementsError, setCourseRequirementsError] = useState(null);

    const [courseReviews, setCourseReviews] = useState(null);
    const [courseReviewsLoading, setCourseReviewsLoading] = useState(true);
    const [courseReviewError, setCourseReviewsError] = useState(null);

    // Run to enroll to course

    // Run to un-enroll to course

    useEffect(() => {

        const fetchCourse = async () => {
            try
            {
                const res = await baseClient.get(`/courses/${courseId}`);
                setCourse(res.data);
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

        const fetchCourseModules = async () => {
            try
            {
                const res = await baseClient.get(`/course-modules/${courseId}`);
                setCourseModules(res.data);
            }

            catch (err)
            {
                setCourseModulesError(err.message);
            }

            finally
            {
                setCourseModulesLoading(false);
            }
        };

        const fetchCourseSkills = async () => {
            try
            {
                const res = await baseClient.get(`/course-skills/${courseId}`);
                setCourseSkills(res.data);
            }

            catch (err)
            {
                setCourseSkillsError(err.message);
            }

            finally
            {
                setCourseSkillsLoading(false);
            }
        };

        const fetchCourseRequirements = async () => {
            try
            {
                const res = await baseClient.get(`/course-requirements/${courseId}`);
                setCourseRequirements(res.data);
            }

            catch (err)
            {
                setCourseRequirementsError(err.message);
            }

            finally
            {
                setCourseRequirementsLoading(false);
            }
        };

        const fetchCourseReviews = async () => {
            try
            {
                const res = await baseClient.get(`/course-reviews/${courseId}`);
                setCourseReviews(res.data);
            }

            catch (err)
            {
                setCourseReviewsError(err.message);
            }

            finally
            {
                setCourseReviewsLoading(false);
            }
        };

        fetchCourse();
        fetchCourseModules();
        fetchCourseSkills();
        fetchCourseRequirements();
        fetchCourseReviews();

    }, [courseId]);

    return (
        <div className="course-details bg-gray-800 py-16">
            <div className="container mx-auto px-6">
                {
                    (courseLoading) ? <p>Loading...</p>
                    : ((courseError) ? <p>Error: {courseError}</p>: (
                        <>
                            <CourseDetailsHero
                                courseName={course.title}
                                imgSource={course.picUrl}
                                imgAlt={course.description}
                                coursePrice="25"
                            />
                            <CourseDetailsOverview
                                courseDescription={course.description}
                                courseLevel={course.level}
                            />
                        </>
                    ))
                }
                <CourseDetailsSyllabus>
                    {
                        (courseModulesLoading) ? <p>Loading...</p>
                        :((courseModulesError) ? <p>Error: {courseModulesError}</p>:
                        (
                            courseModules.map((courseModule, i) => (
                                <CourseDetailsSyllabysModule
                                    key={courseModule.id}
                                    collapseId={`module${courseModule.id}`}
                                    moduleTitle={`Module ${i + 1}: ${courseModule.title}`}
                                    moduleDescription={courseModule.description}
                                />
                            ))
                        ))
                    }
                </CourseDetailsSyllabus>

                <CourseDetailsSkillsContainer>
                    {
                        (courseSkillsLoading) ? <p>Loading...</p>
                        : ((courseSkillsError) ? <p>Error: {courseSkillsError}</p>:
                        (
                            courseSkills.map(courseSkill => (
                                <CourseDetailsSkill
                                    key={courseSkill.id}
                                    skill={courseSkill.skill}
                                />
                            ))
                        ))
                    }
                </CourseDetailsSkillsContainer>

                <CourseRequirementsContainer>
                    {
                        (courseRequirementsLoading) ? <p>Loading...</p>:
                        ((courseRequirementsError) ? <p>Error: {courseRequirementsError}</p>:
                        (
                            courseRequirements.map(courseRequirement => (
                                <CourseRequirement 
                                    key={courseRequirement.id}
                                    requirement={courseRequirement.requirement}
                                />
                            ))
                        ))
                    }
                </CourseRequirementsContainer>

                <StudentReviewContainer>
                    {
                        (courseReviewsLoading) ? <p>Loading...</p>
                        : ((courseReviewError) ? <p>Error: {courseReviewError}</p>:
                        (
                            courseReviews.map(courseReview => (
                                <StudentReview
                                    key={courseReview.id}
                                    imgSource={courseReview.picUrl}
                                    imgAlt={courseReview.description}
                                    studentName={courseReview.name}
                                    studentProfession={courseReview.occupation}
                                    studentReview={courseReview.description}
                                />
                            ))
                        ))
                    }
                </StudentReviewContainer>

                <div className="text-center">
                    <button className="bg-blue-600 text-white py-3 px-8 rounded-lg">Enroll Now</button>
                </div>
            </div>
        </div>
    );

}

export default CourseDetails;
