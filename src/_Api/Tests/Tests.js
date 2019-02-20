import axios from 'axios';

export const getTestsAPI = () => {
    return axios.get(`/v0.1/tests?type=tech-mahindra`);
};

