import {PUSH_TEST_OVERVIEW} from "../actions/testattempts";

function pushTestAttempts(data) {

    return {type: PUSH_TEST_OVERVIEW, data};


}


export {pushTestAttempts};
