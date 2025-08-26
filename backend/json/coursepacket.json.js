/** JSON payload for Course Packet Model */

// Return Object with course packet id, title, description, picUrl
exports.coursePacketJson = (id, title, description, picUrl) => {
    return {
        id,
        title,
        description,
        picUrl
    };
};