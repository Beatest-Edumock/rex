import {PUSH_TEST_OVERVIEW, UPDATE_APPLICATION, UPDATE_TEST_ATTEMPT_SUBSET} from "../../actions/testattempts";

function testOverviewReducer(state = {test_attempts: []}, action) {


    switch (action.type) {
        case PUSH_TEST_OVERVIEW:
            return action.data;

        case UPDATE_APPLICATION:
            return updateApplicationReducer(state, action.data);

        // case UPDATE_TEST_ATTEMPT_SUBSET:
        //     return mergeTestAttempts(state, action.data);

        default:
            return state;

    }


}

function updateApplicationReducer(state, applications) {


    return {...state, test_attempts: applications}


}


function mergeTestAttempts(state, applicationSubset) {

    const testAttempts = state.test_attempts;

    const newTestAttempts = applicationSubset.concat(
        testAttempts.filter((el) => !applicationSubset.map(x => x.id).includes(el.id))
    );


    return {
        ...state,
        test_attempts: newTestAttempts
    }


}


export {testOverviewReducer};
