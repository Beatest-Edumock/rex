import axios from 'axios';

export const getTestAttemptsOverviewAPI = (testID,date) => {
    return axios.get(`/rex/test/${testID}/attempts/${date}`);
};

export const getTestAttemptDatesAPI = (testID) => {
    return axios.get(`/rex/test/${testID}/dates`);
};
