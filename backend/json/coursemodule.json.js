/** JSON Payload for 'CourseModule' Entity */

exports.courseModuleJson = (id, title, description, courseId) => {
    return {
        id,
        title,
        description,
        courseId
    };
};