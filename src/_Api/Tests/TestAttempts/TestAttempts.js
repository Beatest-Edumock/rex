import axios from 'axios';

export const getTestAttemptsOverviewAPI = (testID) => {
    return axios.get(`/rex/test/${testID}/attempts`);
};
