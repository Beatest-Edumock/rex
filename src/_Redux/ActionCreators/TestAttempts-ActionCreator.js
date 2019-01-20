import {PUSH_TEST_OVERVIEW, UPDATE_APPLICATION} from "../actions/testattempts";

function pushTestAttempts(data) {

    return {type: PUSH_TEST_OVERVIEW, data};


}

function updateApplication(applications) {

    return {type: UPDATE_APPLICATION, data: applications};

}


export {pushTestAttempts};
