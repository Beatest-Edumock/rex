import {ADD_USER, REMOVE_USER} from "../actions/user"

/**
 *
 * Add the user to the store
 * @param user :  user object returned from api/user
 *
 * @returns {{type: string, user: *}}
 */
function addUserAC(user) {

    return {type: ADD_USER, user};


}


function removeUserAC() {

    return {type: REMOVE_USER};

}

function updateTestAttempts(updatedAttempts) {

    return {type: REMOVE_USER, data: updatedAttempts};

}

export {addUserAC, removeUserAC};