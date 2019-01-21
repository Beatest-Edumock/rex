import {PUSH_TEST_OVERVIEW, UPDATE_APPLICATION, UPDATE_TEST_ATTEMPT_SUBSET} from "../actions/testattempts";

function pushTestAttempts(data) {

    return {type: PUSH_TEST_OVERVIEW, data};


}

function updateApplications(applications) {

    return {type: UPDATE_APPLICATION, data: applications};

}

function updateApplicationSubsetAC(applications) {
    return {type: UPDATE_TEST_ATTEMPT_SUBSET, data: applications};

}


function updateApplicationStatusByTestAttemptIDAsyncAC(testAttemptIDs, newStatus) {

    return (dispatch, getState) => {
        const {test_attempts} = getState().testOverview;


        let updatedApplicants = test_attempts.filter(el => testAttemptIDs.includes(el.id));

        updatedApplicants = test_attempts.map(el => {
            if (!testAttemptIDs.includes(el.id)) {
                return el;
            }


            return {
                ...el,
                user: {
                    ...el.user,
                    application: {
                        ...el.user.application,
                        type: newStatus
                    }
                }
            };
        });

        dispatch(updateApplications(updatedApplicants));


    }

}


export {pushTestAttempts, updateApplications, updateApplicationStatusByTestAttemptIDAsyncAC};
