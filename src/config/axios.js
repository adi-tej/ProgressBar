import axios from 'axios';

/**
 * Backend Connection configuration
 * Replace the below baseUrl with your local IP to connect to local backend server
 **/
const api = axios.create({
    baseURL: 'https://pb-api.herokuapp.com',
    timeout: 10000
});

export default api;
