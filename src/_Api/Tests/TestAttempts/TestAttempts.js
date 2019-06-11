import axios from 'axios';


/**
 * store the current date value selected by the user.
 *
 * @type {null}
 */
let currentSelectedDate = null;

export const getTestAttemptsOverviewAPI = (testID, date) => {
    currentSelectedDate = date;
    return axios.get(`/rex/test/${testID}/attempts/${date}`);
};

export const getTestAttemptsQualitativeAnalysisAPI = (testID) => {

    return axios.get(`/rex/test/${testID}/attempts/${currentSelectedDate}/qualitative`);
};

export const getTestAttemptsPersonalityAnalysisAPI = (testID) => {

    return axios.get(`/rex/test/${testID}/attempts/${currentSelectedDate}/personality`);
};

export const getTestAttemptDatesAPI = (testID) => {
    return axios.get(`/rex/test/${testID}/dates`);
};


