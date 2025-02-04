import axios from "axios";

const testUrl = 'http://localhost:4040';

const ApiClient = axios.create({
    baseURL: `${testUrl}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    }
});

ApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiClient;