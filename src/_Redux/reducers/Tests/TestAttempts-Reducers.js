import {PUSH_TEST_OVERVIEW} from "../../actions/testattempts";

function testAttemptsReducer(state = [], action) {


    switch (action.type) {
        case PUSH_TEST_OVERVIEW:
            return action.data;

        default:
            return state;

    }


}

export {testAttemptsReducer};