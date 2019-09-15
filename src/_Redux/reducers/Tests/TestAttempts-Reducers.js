import {PUSH_PERSONALITY_ANAL, PUSH_QUALITATIVE_ANAL, PUSH_TEST_OVERVIEW, UPDATE_APPLICATION, UPDATE_TEST_ATTEMPT_SUBSET} from "../../actions/testattempts";
import _ from "lodash";

function testOverviewReducer(state = {test_attempts: []}, action) {


    switch (action.type) {
        case PUSH_TEST_OVERVIEW:
            return action.data;

        case UPDATE_APPLICATION:
            return updateApplicationReducer(state, action.data);

        case PUSH_QUALITATIVE_ANAL:
            return updateWithQualitativeAnalysis(state, action.data);

        case PUSH_PERSONALITY_ANAL:
            return updateWithPersonalityAnalysis(state, action.data);
        default:
            return state;

    }


}

function updateApplicationReducer(state, applications) {


    return {...state, test_attempts: applications}


}

function updateWithPersonalityAnalysis(state, personalityAnalysisAPIresponse) {

    const testAttemptsArray = state.test_attempts;

    const testAttemptsByAttemptID = _.keyBy(personalityAnalysisAPIresponse.test_attempts, function (o) {
        return o.id;
    });


    const updatedTestAttempts = testAttemptsArray.map((el) => {
        const test_attempt = testAttemptsByAttemptID[el.id];
        const personalityReport = testAttemptsByAttemptID[el.id].sixteen_p_report;

        Object.keys(personalityReport).map((key) => {
            if (personalityReport[key] === null) {
                delete personalityReport[key];
                return;
            }

            personalityReport[key] =  _.round(personalityReport[key] , 0);


            delete personalityReport['test_attempt_id'];
            delete personalityReport['domain_based_ability'];
            delete personalityReport['paragraph_writing_ability'];
            delete personalityReport['created_date'];
            delete personalityReport['last_update_date'];
            delete personalityReport['is_finished'];

        });


        return {...el, personality: testAttemptsByAttemptID[el.id].sixteen_p_report};

    });


    return {...state, test_attempts: updatedTestAttempts};

}

//Hack to handle null report. TO BE FIXED

function createDummyReport() {
    const dummyReport = {
        'conceptual_level' : 0,
        'inference_level' : 0,
        'analytical_ability' : 0,
        'mental_math_speed' : 0,
        'data_interpretation_ability' : 0,
        'domain_based_ability' : 0,
        'logical_reasoning_ability' : 0,
        'paragraph_writing_ability' : 0,
        'verbal_ability' : 0,
        'verbal_reasoning' : 0,
        'coding_quality' : 0,
        'create_date' : 0,
        'algorithmic_sense' : 0,
        'domain_knowledge' : 0,
        'research_ability' : 0,
        'coding_sense' : 0
    }
    return dummyReport;
}

function updateWithQualitativeAnalysis(state, getQualitativeAnalysisAPIResponse) {

    const testAttemptsArray = state.test_attempts;

    const testAttemptsByAttemptID = _.keyBy(getQualitativeAnalysisAPIResponse.test_attempts, function (o) {
        return o.id;
    });


    const updatedTestAttempts = testAttemptsArray.map((el) => {
        const test_attempt = testAttemptsByAttemptID[el.id];
        let report = testAttemptsByAttemptID[el.id].report;
        if (report === null) {
            report = createDummyReport();
            testAttemptsByAttemptID[el.id].report = report;
        }
        Object.keys(report).map((key) => {
            if (report[key] === null) {
                delete report[key];
                return;
            }

            console.log(report[key]);
            report[key] = _.round(report[key] * 10, 0);
            console.log(report[key]);


            delete report['test_attempt_id'];
            delete report['domain_based_ability'];
            delete report['paragraph_writing_ability'];
            delete report['created_date'];
            delete report['last_update_date'];
            delete report['is_finished'];

        });


        return {...el, report: testAttemptsByAttemptID[el.id].report};

    });


    return {...state, test_attempts: updatedTestAttempts};

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
