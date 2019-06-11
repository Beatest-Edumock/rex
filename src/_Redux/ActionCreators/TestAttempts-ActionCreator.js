import {PUSH_PERSONALITY_ANAL, PUSH_QUALITATIVE_ANAL, PUSH_TEST_OVERVIEW, UPDATE_APPLICATION, UPDATE_TEST_ATTEMPT_SUBSET} from "../actions/testattempts";
import {updateApplicationStatusAPI} from "../../_Api/Applications";

function pushTestAttempts(data) {

    return {type: PUSH_TEST_OVERVIEW, data};


}

function updateApplications(applications) {

    return {type: UPDATE_APPLICATION, data: applications};

}

function updateApplicationSubsetAC(applications) {
    return {type: UPDATE_TEST_ATTEMPT_SUBSET, data: applications};

}

function pushQualitativeAnalysisAC(qualitativeAnalysisReport) {
    return {type: PUSH_QUALITATIVE_ANAL, data: qualitativeAnalysisReport};

}

function pushPersonalityAnalysisAC(personalityAnalysisReport) {
    return {type: PUSH_PERSONALITY_ANAL, data: personalityAnalysisReport};

}


function updateApplicationStatusByTestAttemptIDAsyncAC(testAttemptIDs, newStatus) {

    return (dispatch, getState) => {
        const {test_attempts} = getState().testOverview;
        const userIDs = [];

        const updatedApplicants = test_attempts.map(el => {
            if (!testAttemptIDs.includes(el.id)) {
                return el;
            }

            userIDs.push(el.user_id);

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

        updateApplicationStatusAPI(userIDs, newStatus).catch(() => {
            dispatch(updateApplications(test_attempts));
        });


        dispatch(updateApplications(updatedApplicants));


    }

}


export {pushTestAttempts, updateApplications, updateApplicationStatusByTestAttemptIDAsyncAC, pushQualitativeAnalysisAC, pushPersonalityAnalysisAC};
