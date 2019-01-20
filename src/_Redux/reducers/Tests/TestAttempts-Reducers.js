import {PUSH_TEST_OVERVIEW, UPDATE_APPLICATION} from "../../actions/testattempts";

function testOverviewReducer(state = {test_attempts: []}, action) {


    switch (action.type) {
        case PUSH_TEST_OVERVIEW:
            return action.data;

        case UPDATE_APPLICATION:
            return updateApplicationReducer(state, action.data);


        default:
            return state;

    }


}

function updateApplicationReducer(state, applications) {

    const testOverview = state;

    return {...testOverview, test_attempts: applications}


}

export {testOverviewReducer};
