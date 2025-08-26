/** JSON Payload for the 'CourseReview' Entity */

exports.courseReviewJson = (id, name, picUrl, occupation, description, userId, courseId, rating) => {
    return {
        id,
        name,
        picUrl,
        occupation,
        description,
        userId,
        courseId,
        rating
    };
};