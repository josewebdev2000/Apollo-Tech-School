/** JSON payload for Course Model */

// Return Object with course id, title, description, picUrl, level
exports.courseJson = (id, title, description, picUrl, level) => {
    return {
        id,
        title,
        description,
        picUrl,
        level
    };
};