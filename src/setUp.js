import axios from 'axios';


function setUpApp() {
    axios.defaults.baseURL = '/api/';

}

export {setUpApp};


