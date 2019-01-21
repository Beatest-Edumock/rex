import axios from 'axios';


export const updateApplicationStatusAPI = (user_ids, status) => {

    return axios.put('/rex/applications', {user_ids, status});
};
