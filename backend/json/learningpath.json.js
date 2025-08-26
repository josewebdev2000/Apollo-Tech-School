/** JSON Payload for the Learning Path Model */

// Return Object with id, title description, and picUrl
exports.learningPathJson = (id, title, description, picUrl) => {
    return {
        id,
        title,
        description,
        picUrl
    };
};