/** JSON Payloads for the "User" Entity */

exports.userRegisterJson = (id, firstName, lastName, email, pic_url, membershipId) => {
    return {
        id,
        firstName,
        lastName,
        email,
        picUrl: pic_url,
        membershipId
    }
};

exports.userLoginJson = (id, firstName, lastName, email, pic_url, membershipId) => {
    return {
        id,
        firstName,
        lastName,
        email,
        picUrl: pic_url,
        membershipId
    }
};

exports.userLogoutJson = (data) => {
    return data;
};

exports.userUpdateJson = (id, firstName, lastName, email, pic_url, membershipId) => {
    return {
        id,
        firstName,
        lastName,
        email,
        picUrl: pic_url,
        membershipId
    };
};

exports.userDeleteJson = (msg) => {
    return {
        message: msg
    };
};

exports.userEnrolledInMembershipMsg = (membershipId, msg) => {
    return {
        membershipId: membershipId,
        message: msg
    }
};

exports.userDeenrolledFromMembershipMsg = (msg) => {
    return {
        message: msg
    };
};