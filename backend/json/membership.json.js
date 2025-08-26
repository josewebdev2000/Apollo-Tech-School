/** JSON Payload for the Entity "Membership" */

exports.membershipJson = (id, title, description, price) => {
    return {
        id,
        title,
        description,
        price
    };
};