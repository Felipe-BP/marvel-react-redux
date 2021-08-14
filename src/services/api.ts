import axios from 'axios';

const {
    REACT_APP_MARVEL_QL_PUBLIC_KEY: MARVEL_QL_PUBLIC_KEY,
} = process.env;

const api = axios.create({
    baseURL: 'http://gateway.marvel.com',
});

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apikey: MARVEL_QL_PUBLIC_KEY,
    };
    return config;
}, (err) => {
    throw err;
});

export { api };
